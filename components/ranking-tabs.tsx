"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Flame, Clock, Calendar, Trophy } from "lucide-react"
import Link from "next/link"

export function RankingTabs() {
  const [activeTab, setActiveTab] = useState("hot")

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Feed de Memes</h2>
        <Link href="/rankings">
          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
            Ver rankings
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="hot" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-2">
          <TabsTrigger value="hot" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span className="hidden sm:inline">Em alta</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Novos</span>
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Semana</span>
          </TabsTrigger>
          <TabsTrigger value="top" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Melhores</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default RankingTabs
