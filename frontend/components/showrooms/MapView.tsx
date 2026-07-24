"use client";

import React from "react";
import { Showroom } from "@/types/showroom";

interface MapViewProps {
  showrooms?: Showroom[];
  selectedPrefecture?: string;
  onSelectPrefecture?: (prefectureName: string) => void;
}

// 精細な日本地図の都道府県SVGデータ（白地図スタイル）
const JAPAN_SVG_MAP = [
  // 北海道・東北
  {
    id: "hokkaido",
    name: "北海道",
    d: "M 740,150 C 760,110 810,80 870,100 C 920,115 940,150 900,200 C 860,230 790,220 750,180 C 730,195 700,185 680,150 C 700,140 720,145 740,150 Z",
    labelX: 810,
    labelY: 155,
  },
  {
    id: "aomori",
    name: "青森県",
    d: "M 675,250 C 700,240 740,245 750,260 C 740,285 720,300 670,295 C 660,270 665,255 675,250 Z",
    labelX: 705,
    labelY: 270,
  },
  {
    id: "iwate",
    name: "岩手県",
    d: "M 700,300 L 750,300 C 755,335 745,365 735,375 L 690,370 Z",
    labelX: 725,
    labelY: 335,
  },
  {
    id: "akita",
    name: "秋田県",
    d: "M 660,300 L 695,300 C 690,370 655,375 650,340 Z",
    labelX: 675,
    labelY: 335,
  },
  {
    id: "miyagi",
    name: "宮城県",
    d: "M 695,375 L 740,375 C 745,405 730,435 705,435 L 685,430 Z",
    labelX: 715,
    labelY: 405,
  },
  {
    id: "yamagata",
    name: "山形県",
    d: "M 650,375 L 690,375 C 685,430 645,425 650,375 Z",
    labelX: 668,
    labelY: 405,
  },
  {
    id: "fukushima",
    name: "福島県",
    d: "M 645,430 L 730,435 C 725,470 700,495 655,495 L 640,480 Z",
    labelX: 685,
    labelY: 460,
  },

  // 関東
  {
    id: "ibaraki",
    name: "茨城県",
    d: "M 690,500 L 740,500 C 745,535 730,560 690,560 L 685,550 Z",
    labelX: 710,
    labelY: 530,
  },
  {
    id: "tochigi",
    name: "栃木県",
    d: "M 640,500 L 685,500 L 680,555 L 635,555 Z",
    labelX: 660,
    labelY: 528,
  },
  {
    id: "gunma",
    name: "群馬県",
    d: "M 590,500 L 635,500 L 630,555 L 580,550 Z",
    labelX: 608,
    labelY: 528,
  },
  {
    id: "saitama",
    name: "埼玉県",
    d: "M 600,560 L 680,560 L 675,600 L 595,600 Z",
    labelX: 638,
    labelY: 580,
  },
  {
    id: "chiba",
    name: "千葉県",
    d: "M 685,565 C 715,560 745,590 735,630 C 715,660 685,650 675,630 Z",
    labelX: 705,
    labelY: 605,
  },
  {
    id: "tokyo",
    name: "東京都",
    d: "M 595,605 L 670,605 L 665,640 L 590,640 Z",
    labelX: 630,
    labelY: 622,
  },
  {
    id: "kanagawa",
    name: "神奈川県",
    d: "M 590,645 L 665,645 L 655,685 C 615,695 585,675 585,655 Z",
    labelX: 625,
    labelY: 665,
  },

  // 中部・北陸
  {
    id: "niigata",
    name: "新潟県",
    d: "M 555,430 L 640,430 C 585,500 540,495 555,430 Z",
    labelX: 585,
    labelY: 460,
  },
  {
    id: "nagano",
    name: "長野県",
    d: "M 530,500 L 585,500 L 575,600 L 520,595 Z",
    labelX: 552,
    labelY: 550,
  },
  {
    id: "yamanashi",
    name: "山梨県",
    d: "M 560,605 L 595,605 L 590,645 L 555,645 Z",
    labelX: 575,
    labelY: 625,
  },
  {
    id: "shizuoka",
    name: "静岡県",
    d: "M 520,605 L 585,650 C 570,695 530,700 510,660 Z",
    labelX: 550,
    labelY: 650,
  },
  {
    id: "aichi",
    name: "愛知県",
    d: "M 465,605 L 515,605 L 505,680 C 475,690 455,665 460,640 Z",
    labelX: 485,
    labelY: 645,
  },
  {
    id: "gifu",
    name: "岐阜県",
    d: "M 470,500 L 525,500 L 515,600 L 460,600 Z",
    labelX: 492,
    labelY: 550,
  },
  {
    id: "toyama",
    name: "富山県",
    d: "M 495,430 C 528,425 550,435 550,495 L 488,495 Z",
    labelX: 518,
    labelY: 462,
  },
  {
    id: "ishikawa",
    name: "石川県",
    d: "M 450,375 C 480,395 490,430 480,495 L 445,490 Z",
    labelX: 465,
    labelY: 435,
  },
  {
    id: "fukui",
    name: "福井県",
    d: "M 410,500 L 460,500 L 450,560 C 420,565 405,535 410,500 Z",
    labelX: 432,
    labelY: 530,
  },

  // 近畿
  {
    id: "shiga",
    name: "滋賀県",
    d: "M 420,565 L 455,565 L 448,615 L 415,615 Z",
    labelX: 435,
    labelY: 590,
  },
  {
    id: "kyoto",
    name: "京都府",
    d: "M 380,520 L 418,520 L 410,615 L 372,615 Z",
    labelX: 395,
    labelY: 568,
  },
  {
    id: "mie",
    name: "三重県",
    d: "M 428,620 C 465,620 470,670 450,715 L 415,710 Z",
    labelX: 438,
    labelY: 665,
  },
  {
    id: "nara",
    name: "奈良県",
    d: "M 385,650 L 422,650 L 415,720 L 378,720 Z",
    labelX: 400,
    labelY: 685,
  },
  {
    id: "wakayama",
    name: "和歌山県",
    d: "M 340,690 C 380,690 415,720 400,770 C 355,780 328,745 340,690 Z",
    labelX: 370,
    labelY: 735,
  },
  {
    id: "osaka",
    name: "大阪府",
    d: "M 372,620 L 410,620 L 405,645 L 368,645 Z",
    labelX: 388,
    labelY: 632,
  },
  {
    id: "hyogo",
    name: "兵庫県",
    d: "M 320,520 L 375,520 L 368,625 L 312,625 Z",
    labelX: 342,
    labelY: 572,
  },

  // 中国・四国
  {
    id: "tottori",
    name: "鳥取県",
    d: "M 260,520 L 315,520 L 310,570 L 255,570 Z",
    labelX: 285,
    labelY: 545,
  },
  {
    id: "shimane",
    name: "島根県",
    d: "M 180,535 C 225,520 255,520 255,570 L 175,575 Z",
    labelX: 215,
    labelY: 548,
  },
  {
    id: "okayama",
    name: "岡山県",
    d: "M 255,575 L 310,575 L 305,625 L 250,625 Z",
    labelX: 280,
    labelY: 600,
  },
  {
    id: "hiroshima",
    name: "広島県",
    d: "M 175,580 L 245,575 L 238,635 L 168,635 Z",
    labelX: 205,
    labelY: 605,
  },
  {
    id: "yamaguchi",
    name: "山口県",
    d: "M 100,575 C 138,575 170,580 165,635 C 100,630 95,600 100,575 Z",
    labelX: 132,
    labelY: 605,
  },
  {
    id: "kagawa",
    name: "香川県",
    d: "M 240,655 L 300,655 L 295,688 L 235,688 Z",
    labelX: 268,
    labelY: 672,
  },
  {
    id: "tokushima",
    name: "徳島県",
    d: "M 235,692 L 295,692 C 295,720 282,740 230,735 Z",
    labelX: 262,
    labelY: 712,
  },
  {
    id: "ehime",
    name: "愛媛県",
    d: "M 165,660 L 235,655 L 225,715 C 180,720 152,700 165,660 Z",
    labelX: 195,
    labelY: 685,
  },
  {
    id: "kochi",
    name: "高知県",
    d: "M 152,715 C 215,715 285,735 270,780 C 205,790 138,765 152,715 Z",
    labelX: 210,
    labelY: 748,
  },

  // 九州・沖縄
  {
    id: "fukuoka",
    name: "福岡県",
    d: "M 55,640 L 110,640 L 102,690 L 48,690 Z",
    labelX: 78,
    labelY: 665,
  },
  {
    id: "saga",
    name: "佐賀県",
    d: "M 10,655 L 50,655 L 43,700 L 5,700 Z",
    labelX: 25,
    labelY: 678,
  },
  {
    id: "nagasaki",
    name: "長崎県",
    d: "M 5,680 C 28,670 40,700 28,745 C 0,745 0,710 5,680 Z",
    labelX: 15,
    labelY: 712,
  },
  {
    id: "oita",
    name: "大分県",
    d: "M 102,695 L 155,695 C 155,725 148,750 95,745 Z",
    labelX: 125,
    labelY: 720,
  },
  {
    id: "kumamoto",
    name: "熊本県",
    d: "M 38,705 L 95,705 L 85,775 L 28,770 Z",
    labelX: 62,
    labelY: 740,
  },
  {
    id: "miyazaki",
    name: "宮崎県",
    d: "M 85,750 L 140,750 C 138,795 122,830 72,820 Z",
    labelX: 108,
    labelY: 785,
  },
  {
    id: "kagoshima",
    name: "鹿児島県",
    d: "M 20,775 L 72,775 C 72,825 50,865 5,850 Z",
    labelX: 42,
    labelY: 812,
  },

  // 沖縄（右下に配置）
  {
    id: "okinawa",
    name: "沖縄県",
    d: "M 660,860 C 690,840 730,860 750,890 C 730,920 680,920 650,890 Z",
    labelX: 700,
    labelY: 880,
  },
];

export function MapView({
  showrooms = [],
  selectedPrefecture,
  onSelectPrefecture,
}: MapViewProps) {
  // ショールーム数を集計
  const showroomCounts = showrooms.reduce<Record<string, number>>((acc, s) => {
    if (s?.prefecture) {
      acc[s.prefecture] = (acc[s.prefecture] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm w-full">
      <div className="flex w-full items-center justify-between border-b border-slate-100 pb-2 mb-2">
        <h3 className="text-xs font-bold text-slate-800">日本全国マップ</h3>
        <span className="text-[11px] text-slate-500">
          ショールームのあるエリアを選択できます
        </span>
      </div>

      {/* 白地図スタイル描画エリア */}
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
        <svg
          viewBox="0 0 960 960"
          className="h-full w-full select-none drop-shadow-2xs"
          style={{ background: "#ffffff" }}
        >
          {/* 右下の沖縄用 枠線 */}
          <path
            d="M 600,810 L 600,940 L 930,940"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />

          {/* 都道府県描画グループ */}
          <g
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {JAPAN_SVG_MAP.map((pref) => {
              const count = showroomCounts[pref.name] || 0;
              const hasShowroom = count > 0;
              const isSelected = selectedPrefecture === pref.name;

              // 配色ルール（画像と同じ黒枠白地ベース）
              let fillColor = "#ffffff";
              let textColor = "#1e293b";

              if (hasShowroom) {
                fillColor = isSelected ? "#0f172a" : "#3b82f6"; // 拠点あり（青 / 選択時黒）
                textColor = "#ffffff";
              }

              return (
                <g
                  key={pref.id}
                  className="cursor-pointer group transition-all"
                  onClick={() => onSelectPrefecture?.(pref.name)}
                >
                  <path
                    d={pref.d}
                    fill={fillColor}
                    className="transition-colors duration-150 group-hover:fill-blue-200"
                  />
                  {hasShowroom && (
                    <text
                      x={pref.labelX}
                      y={pref.labelY}
                      fill={textColor}
                      fontSize="22"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      stroke="none"
                    >
                      {pref.name.replace(/(東京都|大阪府|京都府|県)/g, "")}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 凡例 */}
      <div className="mt-2 flex items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-blue-500 border border-black" />
          <span>ショールームあり</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-white border border-black" />
          <span>対象外</span>
        </div>
      </div>
    </div>
  );
}
