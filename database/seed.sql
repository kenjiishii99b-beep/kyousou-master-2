USE techzeron_test;

-- =====================================================
-- 会員
-- ※ password_hashはテスト用であり、ログインには使用しません
-- =====================================================

INSERT INTO members (
    id,
    email,
    password_hash,
    display_name,
    organization_name,
    role,
    status
) VALUES
(
    1,
    'admin@example.com',
    'DUMMY_NOT_FOR_LOGIN',
    'TSL管理者',
    'Techzeron',
    'administrator',
    'active'
),
(
    2,
    'startup@example.com',
    'DUMMY_NOT_FOR_LOGIN',
    'スタートアップ担当者',
    'スタートアップ株式会社',
    'startup',
    'active'
),
(
    3,
    'showroom@example.com',
    'DUMMY_NOT_FOR_LOGIN',
    'ショールーム担当者',
    'Techzeron名古屋ショールーム',
    'showroom',
    'active'
)
ON DUPLICATE KEY UPDATE
    display_name = VALUES(display_name),
    organization_name = VALUES(organization_name),
    role = VALUES(role),
    status = VALUES(status);

-- =====================================================
-- ショールーム
-- =====================================================

INSERT INTO showrooms (
    id,
    name,
    prefecture,
    city,
    address,
    description,
    capacity,
    image_url,
    status
) VALUES
(
    1,
    'Techzeron名古屋ショールーム',
    '愛知県',
    '名古屋市',
    '愛知県名古屋市中区1-1-1',
    '住宅設備とスタートアップ製品を体験できるショールームです。',
    50,
    NULL,
    'available'
),
(
    2,
    'Techzeron東京ショールーム',
    '東京都',
    '新宿区',
    '東京都新宿区1-1-1',
    '最新の暮らしとテクノロジーを体験できるショールームです。',
    80,
    NULL,
    'available'
),
(
    3,
    'Techzeron札幌ショールーム',
    '北海道',
    '札幌市',
    '北海道札幌市中央区1-1-1',
    '北海道エリアの暮らしと新しい技術を体験できるショールームです。',
    60,
    NULL,
    'available'
),
(
    4,
    'Techzeron仙台ショールーム',
    '宮城県',
    '仙台市',
    '宮城県仙台市青葉区1-1-1',
    '東北エリアの生活者検証や製品展示に利用できるショールームです。',
    55,
    NULL,
    'available'
),
(
    5,
    'Techzeronさいたまショールーム',
    '埼玉県',
    'さいたま市',
    '埼玉県さいたま市大宮区1-1-1',
    '首都圏のファミリー層を対象に製品体験を実施できるショールームです。',
    70,
    NULL,
    'available'
),
(
    6,
    'Techzeron横浜ショールーム',
    '神奈川県',
    '横浜市',
    '神奈川県横浜市西区1-1-1',
    '都市型の暮らしをテーマにした展示やユーザー調査ができるショールームです。',
    75,
    NULL,
    'available'
),
(
    7,
    'Techzeron金沢ショールーム',
    '石川県',
    '金沢市',
    '石川県金沢市広岡1-1-1',
    '北陸エリアで住宅設備とスタートアップ製品を展示できるショールームです。',
    45,
    NULL,
    'available'
),
(
    8,
    'Techzeron京都ショールーム',
    '京都府',
    '京都市',
    '京都府京都市下京区1-1-1',
    '伝統的な住空間と最新テクノロジーを組み合わせた体験型ショールームです。',
    50,
    NULL,
    'available'
),
(
    9,
    'Techzeron大阪ショールーム',
    '大阪府',
    '大阪市',
    '大阪府大阪市北区1-1-1',
    '関西エリアの大規模な製品展示や来場者アンケートに対応できるショールームです。',
    90,
    NULL,
    'available'
),
(
    10,
    'Techzeron広島ショールーム',
    '広島県',
    '広島市',
    '広島県広島市中区1-1-1',
    '中国エリアの生活者に向けた製品展示とPoCを実施できるショールームです。',
    55,
    NULL,
    'available'
),
(
    11,
    'Techzeron福岡ショールーム',
    '福岡県',
    '福岡市',
    '福岡県福岡市博多区1-1-1',
    '九州エリアの新しい暮らしを提案する製品展示に適したショールームです。',
    75,
    NULL,
    'available'
),
(
    12,
    'Techzeron那覇ショールーム',
    '沖縄県',
    '那覇市',
    '沖縄県那覇市久茂地1-1-1',
    '沖縄の気候や暮らしに合わせた製品検証を行えるショールームです。',
    40,
    NULL,
    'available'
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    prefecture = VALUES(prefecture),
    city = VALUES(city),
    address = VALUES(address),
    description = VALUES(description),
    capacity = VALUES(capacity),
    status = VALUES(status);

-- =====================================================
-- 展示申請
-- =====================================================

INSERT INTO exhibition_applications (
    id,
    applicant_member_id,
    showroom_id,
    product_name,
    product_description,
    exhibition_purpose,
    requested_start_date,
    requested_end_date,
    required_space,
    setup_requirements,
    status,
    reviewed_by_member_id,
    reviewed_at,
    review_comment
) VALUES
(
    1,
    2,
    1,
    'AIスマートミラー',
    '生活者の健康状態や予定を表示するスマートミラーです。',
    '来場者の反応と利用意向を検証するため。',
    '2026-08-01',
    '2026-08-31',
    '幅2メートル程度',
    '電源とWi-Fiが必要です。',
    'approved',
    1,
    CURRENT_TIMESTAMP,
    'MVP検証用として承認しました。'
)
ON DUPLICATE KEY UPDATE
    product_name = VALUES(product_name),
    product_description = VALUES(product_description),
    exhibition_purpose = VALUES(exhibition_purpose),
    status = VALUES(status),
    review_comment = VALUES(review_comment);

-- =====================================================
-- 展示スケジュール
-- =====================================================

INSERT INTO exhibition_schedules (
    id,
    application_id,
    start_date,
    end_date,
    setup_datetime,
    removal_datetime,
    display_location,
    status,
    notes
) VALUES
(
    1,
    1,
    '2026-08-01',
    '2026-08-31',
    '2026-07-31 10:00:00',
    '2026-09-01 10:00:00',
    '1階メイン展示スペース',
    'scheduled',
    'MVP動作確認用のテストスケジュール'
)
ON DUPLICATE KEY UPDATE
    start_date = VALUES(start_date),
    end_date = VALUES(end_date),
    display_location = VALUES(display_location),
    status = VALUES(status),
    notes = VALUES(notes);