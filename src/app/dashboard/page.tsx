import StatCard from "@/ui/StatCard"
import {
    FaPiggyBank,
    FaWallet,
    FaArrowDown,
    FaArrowUp,
} from "react-icons/fa"

import formatRupiah from "@/utils/formatRupiah"

export default function DashboardPage() {
    const DateNow = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    })
    return (
        <div className="p-3 space-y-6">
            {/* header div content */}
            <div className="flex flex-col gap-8 text-white bg-gradient-to-r
             from-indigo-900 to-indigo-600 rounded-xl p-6">
                {/* top content */}
                <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Welcome Back, User!
                        </h2>
                        <p className="text-md mt-1 font-normal">
                            Insight at a glance: empowering your financial journey
                        </p>

                    </div>

                    <div className="text-right text-md text-white">
                        <p className="font-medium">
                            {DateNow}
                        </p>

                    </div>

                </div>
                {/* start content => bottim content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        title="Total Balance"
                        value={formatRupiah(1000000) || 0}
                        icon= {<FaWallet size={24} />}
                        change="This Month"
                        color="text-gray-600"
                    />
                    <StatCard 
                        title="Total Saving"
                        value={formatRupiah(10000) || 0}
                        icon= {<FaPiggyBank size={24} />}
                        change="For Recomendation"
                        color="text-gray-600"
                    />
                    <StatCard 
                        title="Total Income"
                        value={formatRupiah(5000) || 0}
                        icon= {<FaArrowUp size={24} />}
                        change="This Month"
                        color="text-gray-600"
                    />
                    <StatCard 
                        title="Total expense"
                        value={formatRupiah(2000) || 0}
                        icon= {<FaArrowDown size={24} />}
                        change="This Month"
                        color="text-gray-600"
                    />
                </div>
             </div>
        </div>
    )
}