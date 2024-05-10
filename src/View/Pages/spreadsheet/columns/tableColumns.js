import { ColumnOptions } from "../utils/constants";

export default [
    {
        columnName: "No",
        columnStyle: ColumnOptions.ID
    },
    {
        columnName: "년",
        selectOpt: Array.from({ length: 31 }, (_, index) => 2020 + index),
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "월",
        selectOpt: Array.from({ length: 13 }, (_, index) => 1 + index),
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "사업부",
        selectOpt: [
            "splunk",
            "전략",
            "솔루션",
            "보안",
            "인프라",
            "기술혁신",
            "개발",
            "PreSales",
            "PostSales",
            "플랫폼"
        ],
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "담당자",
        selectOpt: [
            "김한태",
            "박문성",
            "이창훈",
            "김재현"
        ],
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "매출구분",
        selectOpt: [
            "신규",
            "MA",
            "SM",
            "기타"
        ],
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "매출품목",
        selectOpt: [
            "Splunk",
            "Acoustick",
            "ESonSOC",
            "기타",
            "METIS"
        ],
        columnStyle: ColumnOptions.SELECT
    },
    {
        columnName: "거래처[고객명]",
        columnStyle: ColumnOptions.TEXT
    },
    {
        columnName: "프로젝트명",
        columnStyle: ColumnOptions.TEXT
    },
    {
        columnName: "수주액",
        columnStyle: ColumnOptions.NUMBER
    },
    {
        columnName: "수주이익",
        columnStyle: ColumnOptions.NUMBER
    },
    {
        columnName: "매출액",
        columnStyle: ColumnOptions.NUMBER
    },
    {
        columnName: "매출이익",
        columnStyle: ColumnOptions.NUMBER
    },
    {
        columnName: "매입",
        columnStyle: ColumnOptions.GROUP,
        colGruop: [
            {
                columnName: "Total",
                columnStyle: ColumnOptions.NUMBER
            },
            {
                columnName: "물품",
                columnStyle: ColumnOptions.NUMBER
            },
            {
                columnName: "인력",
                columnStyle: ColumnOptions.NUMBER
            }
        ]
    }
]