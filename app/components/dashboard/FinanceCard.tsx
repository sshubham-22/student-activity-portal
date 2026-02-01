import CoinsIcon from "./CoinsIcon"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'

export default function FinanceCard({
    title,
    amount,
    active = false,
    type = "payable",
  }: {
    title: string
    amount: string
    active?: boolean
    type?: "payable" | "paid" | "others"
  }) {
    const getIcon = () => {
      switch (type) {
        case "payable":
          return <CoinsIcon />
        case "paid":
          return (
            <div className="relative">
              <AttachMoneyIcon className="text-violet-500" style={{ fontSize: 48 }} />
              <div className="absolute -top-2 -right-2">
                <CoinsIcon />
              </div>
            </div>
          )
        case "others":
          return <BarChartIcon className="text-violet-500" style={{ fontSize: 48 }} />
        default:
          return <CoinsIcon />
      }
    }

    return (
      <div
        className={`relative rounded-3xl bg-white p-6 flex-1 h-48 flex flex-col items-center justify-center gap-2 border-2 transition-all hover:shadow-xl ${
          active 
            ? 'border-violet-500 shadow-md' 
            : 'border-violet-200 hover:border-violet-400'
        }`}
      >
        <div className="relative mb-3">
          {getIcon()}
        </div>
  
        <div className="text-2xl font-semibold text-black">{amount}</div>
        <div className="text-sm text-neutral-500">{title}</div>
      </div>
    )
  }
  