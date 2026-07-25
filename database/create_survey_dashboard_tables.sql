-- Techzeron Startup Lab
-- アンケート・ダッシュボード・AI分析用テーブル追加
-- 対象DB: techzeron_test
-- 既存 exhibitions は、仕様書上の applications（展示申請本体）として扱う。

USE techzeron_test;

CREATE TABLE IF NOT EXISTS schedules (
    id INT NOT NULL AUTO_INCREMENT,
    application_id INT NOT NULL,
    showroom_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    display_status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_schedules_application_id (application_id),
    KEY idx_schedules_showroom_dates (showroom_id, start_date, end_date),
    CONSTRAINT fk_schedules_exhibitions FOREIGN KEY (application_id)
        REFERENCES exhibitions (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_schedules_dates CHECK (end_date >= start_date),
    CONSTRAINT chk_schedules_display_status CHECK (
        display_status IN ('scheduled', 'in_progress', 'finished')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 仕様書の /api/surveys/{token} と survey_questions.survey_id を成立させる補完テーブル
CREATE TABLE IF NOT EXISTS surveys (
    id INT NOT NULL AUTO_INCREMENT,
    schedule_id INT NOT NULL,
    token CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_surveys_token (token),
    UNIQUE KEY uq_surveys_schedule_id (schedule_id),
    CONSTRAINT fk_surveys_schedules FOREIGN KEY (schedule_id)
        REFERENCES schedules (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT chk_surveys_status CHECK (status IN ('draft', 'active', 'closed'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS survey_questions (
    id INT NOT NULL AUTO_INCREMENT,
    survey_id INT NOT NULL,
    question_code VARCHAR(50) NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    question_type VARCHAR(30) NOT NULL,
    is_required TINYINT(1) NOT NULL DEFAULT 0,
    display_order INT NOT NULL DEFAULT 0,
    options_json JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_survey_questions_code (survey_id, question_code),
    KEY idx_survey_questions_order (survey_id, display_order),
    CONSTRAINT fk_survey_questions_surveys FOREIGN KEY (survey_id)
        REFERENCES surveys (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS survey_answers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    survey_id INT NOT NULL,
    schedule_id INT NOT NULL,
    respondent_token CHAR(36) NOT NULL,
    rating TINYINT NOT NULL,
    interest_level TINYINT NULL,
    usage_intent VARCHAR(30) NULL,
    visit_purpose VARCHAR(50) NULL,
    comment VARCHAR(500) NULL,
    age_range VARCHAR(30) NULL,
    gender VARCHAR(30) NULL,
    ai_analysis_status VARCHAR(30) NOT NULL DEFAULT 'unanalyzed',
    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_survey_answers_respondent_token (respondent_token),
    KEY idx_survey_answers_schedule_id (schedule_id, answered_at),
    KEY idx_survey_answers_survey_id (survey_id, answered_at),
    CONSTRAINT fk_survey_answers_surveys FOREIGN KEY (survey_id)
        REFERENCES surveys (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_survey_answers_schedules FOREIGN KEY (schedule_id)
        REFERENCES schedules (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT chk_survey_answers_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT chk_survey_answers_interest_level CHECK (
        interest_level IS NULL OR interest_level BETWEEN 1 AND 5
    ),
    CONSTRAINT chk_survey_answers_ai_status CHECK (
        ai_analysis_status IN ('unanalyzed', 'pending', 'analyzed', 'failed')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS dashboard_metrics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    schedule_id INT NOT NULL,
    metric_key VARCHAR(100) NOT NULL,
    metric_value DECIMAL(18,4) NOT NULL,
    calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_dashboard_metrics_schedule (schedule_id, calculated_at),
    KEY idx_dashboard_metrics_key (metric_key),
    CONSTRAINT fk_dashboard_metrics_schedules FOREIGN KEY (schedule_id)
        REFERENCES schedules (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS ai_analyses (
    id BIGINT NOT NULL AUTO_INCREMENT,
    application_id INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'analysis_pending',
    summary TEXT NULL,
    keywords JSON NULL,
    improvement_points JSON NULL,
    raw_response JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ai_analyses_application_id (application_id, created_at),
    CONSTRAINT fk_ai_analyses_exhibitions FOREIGN KEY (application_id)
        REFERENCES exhibitions (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_ai_analyses_status CHECK (
        status IN ('analysis_pending', 'running', 'completed', 'failed')
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS operation_logs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100) NULL,
    detail JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_operation_logs_user_id (user_id, created_at),
    KEY idx_operation_logs_resource (resource_type, resource_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 承認済み展示申請からスケジュールを作成
INSERT INTO schedules (
    application_id, showroom_id, start_date, end_date, display_status
)
SELECT
    e.id,
    e.showroom_id,
    e.start_date,
    e.end_date,
    CASE
        WHEN CURRENT_DATE < e.start_date THEN 'scheduled'
        WHEN CURRENT_DATE BETWEEN e.start_date AND e.end_date THEN 'in_progress'
        ELSE 'finished'
    END
FROM exhibitions AS e
WHERE UPPER(e.status) = 'APPROVED'
  AND e.start_date IS NOT NULL
  AND e.end_date IS NOT NULL
ON DUPLICATE KEY UPDATE
    showroom_id = VALUES(showroom_id),
    start_date = VALUES(start_date),
    end_date = VALUES(end_date),
    display_status = VALUES(display_status);

-- 各スケジュールのアンケートを作成
INSERT INTO surveys (schedule_id, token, title, status)
SELECT s.id, UUID(), CONCAT(e.title, ' アンケート'), 'active'
FROM schedules AS s
INNER JOIN exhibitions AS e ON e.id = s.application_id
LEFT JOIN surveys AS sv ON sv.schedule_id = s.id
WHERE sv.id IS NULL;

-- 現在の画面に合わせた初期設問
INSERT INTO survey_questions (
    survey_id, question_code, question_text, question_type,
    is_required, display_order, options_json
)
SELECT id, 'rating', '展示内容の満足度を教えてください', 'rating',
       1, 1, JSON_ARRAY(1, 2, 3, 4, 5)
FROM surveys
ON DUPLICATE KEY UPDATE
    question_text = VALUES(question_text),
    question_type = VALUES(question_type),
    is_required = VALUES(is_required),
    display_order = VALUES(display_order),
    options_json = VALUES(options_json);

INSERT INTO survey_questions (
    survey_id, question_code, question_text, question_type,
    is_required, display_order, options_json
)
SELECT id, 'visit_purpose', 'ご来場の目的は何ですか？', 'single_choice',
       1, 2, JSON_ARRAY('情報収集', '商品比較', '新規検討')
FROM surveys
ON DUPLICATE KEY UPDATE
    question_text = VALUES(question_text),
    question_type = VALUES(question_type),
    is_required = VALUES(is_required),
    display_order = VALUES(display_order),
    options_json = VALUES(options_json);

INSERT INTO survey_questions (
    survey_id, question_code, question_text, question_type,
    is_required, display_order, options_json
)
SELECT id, 'comment', 'ご感想・ご意見があればお聞かせください', 'textarea',
       0, 3, NULL
FROM surveys
ON DUPLICATE KEY UPDATE
    question_text = VALUES(question_text),
    question_type = VALUES(question_type),
    is_required = VALUES(is_required),
    display_order = VALUES(display_order),
    options_json = VALUES(options_json);

SHOW TABLES;

SELECT
    s.id AS schedule_id,
    s.application_id,
    e.title,
    s.showroom_id,
    s.start_date,
    s.end_date,
    s.display_status,
    sv.id AS survey_id,
    sv.token AS survey_token,
    sv.status AS survey_status
FROM schedules AS s
INNER JOIN exhibitions AS e ON e.id = s.application_id
LEFT JOIN surveys AS sv ON sv.schedule_id = s.id
ORDER BY s.id;
