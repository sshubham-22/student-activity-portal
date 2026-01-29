import CoinsIcon from "./CoinsIcon"
export default function FinanceCard({
    title,
    amount,
    active = false,
  }: {
    title: string
    amount: string
    active?: boolean
  }) {
    return (
      <div
        className={`relative rounded-3xl bg-white p-6 w-64 h-48 flex flex-col items-center justify-center gap-2 border-1 border-violet-200 hover:border-2 hover:border-violet-500 hover:shadow-xl
         
        `}
      >
        <div className="relative mb-3">
          <div className="absolute inset-0 rounded-full bg-purple-400 blur-xl opacity-30" />
          <CoinsIcon />
        </div>
  
        <div className="text-xl font-semibold text-black">{amount}</div>
        <div className="text-sm text-neutral-500">{title}</div>
      </div>
    )
  }
  