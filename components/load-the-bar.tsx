"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator, faShare } from "@fortawesome/free-solid-svg-icons"
import { faDumbbell, faGear } from "@fortawesome/free-solid-svg-icons"

// Available plate weights in kg
const AVAILABLE_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25]
const BAR_WEIGHT = 20 // Olympic bar weight in kg

// Purdue gold color
const PURDUE_GOLD = "#CFB991"

type UnitType = "KG" | "LB"

export default function LoadTheBar() {
  const router = useRouter()
  const [targetWeight, setTargetWeight] = useState<string>("")
  const [unit, setUnit] = useState<UnitType>("KG")
  const [selectedPlates, setSelectedPlates] = useState<number[]>([])
  const [actualWeight, setActualWeight] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<"calculate" | "reverse">("calculate")

  // Handle input change - allow whole numbers and one decimal place with a maximum of 2000 pounds
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value

    // Allow digits and one decimal point with one digit after it
    if (/^(\d+)?(\.\d{0,1})?$/.test(text)) {
      // Check if the value exceeds the maximum weight
      const numValue = Number.parseFloat(text) || 0
      const maxValue = unit === "KG" ? 907 : 2000

      // Apply the limit
      if (numValue > maxValue) {
        setTargetWeight(maxValue.toString())
      } else {
        setTargetWeight(text)
      }
    } else if (text === "") {
      // Allow empty input to clear the field
      setTargetWeight("")
    }
  }

  // Calculate plates needed for a given weight
  useEffect(() => {
    // Convert input to number, default to 0 if empty
    const targetWeightNum = targetWeight === "" ? 0 : Number(targetWeight)

    // Weight to load on each side of the bar (minus the bar weight)
    const weightPerSide = Math.max(0, (targetWeightNum - BAR_WEIGHT) / 2)

    let remainingWeight = weightPerSide
    const plates: number[] = []

    // Greedy algorithm to select plates
    for (const plate of AVAILABLE_PLATES) {
      while (remainingWeight >= plate) {
        plates.push(plate)
        remainingWeight -= plate
      }
    }

    // Calculate actual total weight
    const actualTotalWeight = BAR_WEIGHT + plates.reduce((sum, plate) => sum + plate, 0) * 2

    setSelectedPlates(plates)
    setActualWeight(actualTotalWeight)
  }, [targetWeight])

  // Convert KG to LB
  const weightInLb = (actualWeight * 2.20462).toFixed(2)

  // Generate plate colors based on weight
  const getPlateColor = (weight: number) => {
    if (weight === 25) return "#FF0000" // Keep 25 KG plate red
    return PURDUE_GOLD // All other plates use Purdue gold
  }

  // Generate quick math text
  const quickMath = () => {
    if (selectedPlates.length === 0) return `${BAR_WEIGHT} KG (bar only)`

    const plateGroups: Record<number, number> = {}
    selectedPlates.forEach((plate) => {
      plateGroups[plate] = (plateGroups[plate] || 0) + 1
    })

    const parts = Object.entries(plateGroups)
      .map(([plate, count]) => `${count * 2} × ${plate}`)
      .join(" + ")

    return `${BAR_WEIGHT} (bar) + ${parts} ≈ ${actualWeight} KG`
  }

  // Get unique plate weights used
  const uniquePlateWeights = [...new Set(selectedPlates)]

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-center items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Purdue Is Loaded</h1>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[#CFB991]">
        <button
          className={`flex-1 py-4 text-center text-[#CFB991] ${
            activeTab === "calculate" ? "border-b-2 border-[#CFB991] opacity-100" : "opacity-60"
          }`}
          onClick={() => setActiveTab("calculate")}
        >
          CALCULATE
        </button>
        {/* Commented out reverse tab
        <button
          className={`flex-1 py-4 text-center text-[#CFB991] ${
            activeTab === "reverse" ? "border-b-2 border-[#CFB991] opacity-100" : "opacity-60"
          }`}
          onClick={() => setActiveTab("reverse")}
        >
          REVERSE
        </button>
        */}
      </div>

      {activeTab === "calculate" && (
        <div className="flex-1 p-4 overflow-auto">
          {/* Weight input */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              className="flex-1 bg-gray-700 rounded p-3 text-white text-lg text-center"
              placeholder="0"
              value={targetWeight}
              onChange={handleInputChange}
              inputMode="decimal"
              maxLength={6}
            />
            <span className="ml-2 font-bold">{unit}</span>
          </div>

          {/* Weight visualization */}
          <div className="relative h-[300px] mb-6">
            {/* Bar */}
            <div className="absolute left-0 right-0 top-1/2 h-8 bg-gray-600 rounded transform -translate-y-1/2">
              {/* Weight indicator */}
              <div className="absolute -left-12 bg-gray-600 p-2 rounded">
                <span className="font-bold">{BAR_WEIGHT}</span>
              </div>

              {/* Plates */}
              <div className="flex items-center ml-4 absolute top-1/2 transform -translate-y-1/2">
                {selectedPlates.map((plate, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center border-r border-black"
                    style={{
                      backgroundColor: getPlateColor(plate),
                      height: `${Math.min(260, plate * 10.4)}px`,
                      width: `${Math.max(8, plate * 1.5)}px`,
                      marginLeft: i > 0 ? "2px" : "0",
                    }}
                  >
                    <span className="text-white font-bold text-xs">{plate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share button */}
            <button className="absolute right-4 bottom-4">
              <FontAwesomeIcon icon={faShare} className="text-[#CFB991]" size="lg" />
            </button>
          </div>

          {/* Unit selector */}
          <div className="flex rounded overflow-hidden mb-6">
            <button
              className={`flex-1 py-3 text-center ${unit === "KG" ? "bg-[#CFB991] font-bold" : "bg-gray-700"}`}
              onClick={() => setUnit("KG")}
            >
              KG
            </button>
            {/* Commented out LB button
            <button
              className={`flex-1 py-3 text-center ${
                unit === "LB" ? "bg-[#CFB991] font-bold" : "bg-gray-700"
              }`}
              onClick={() => setUnit("LB")}
            >
              LB
            </button>
            */}
          </div>

          {/* Weight display */}
          <div className="text-center mb-6">
            <p className="text-2xl font-bold">
              {actualWeight} <span className="text-lg">KG</span> | {weightInLb} <span className="text-lg">LB</span>
            </p>
          </div>

          {/* Percentage */}
          <div className="flex items-center mb-6">
            <div className="bg-[#CFB991] px-4 py-2 rounded">
              <span className="font-bold">100%</span>
            </div>
            <div className="flex-1 bg-gray-700 px-4 py-2 mx-2 rounded text-center">
              <span>{unit === "KG" ? actualWeight : weightInLb}</span>
            </div>
            <span className="font-bold">{unit}</span>
          </div>

          {/* Plates needed */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold text-center mb-4">Set of Plates Needed</h2>

            {selectedPlates.length > 0 ? (
              <div className="space-y-2">
                {uniquePlateWeights.map((weight) => (
                  <div key={weight} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: getPlateColor(weight) }}></div>
                    <span>{weight} KG Plate</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">(｀・ω・´)ゞ🚂 BOILER UP!</p>
            )}
          </div>

          {/* Quick math */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">
              <span className="font-bold">Quick Maths: </span>
              {quickMath()}
            </p>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <nav className="flex border-t border-gray-800 py-3">
        <div className="flex-1 flex flex-col items-center">
          <FontAwesomeIcon icon={faDumbbell} className="text-[#CFB991]" size="lg" />
          <span className="text-xs mt-1 text-[#CFB991]">Load the Bar</span>
        </div>
        <Link href="/attempts" className="flex-1 flex flex-col items-center">
          <FontAwesomeIcon icon={faCalculator} className="text-gray-500" size="lg" />
          <span className="text-xs mt-1 text-gray-500">Attempts</span>
        </Link>
        <Link href="/settings" className="flex-1 flex flex-col items-center">
          <FontAwesomeIcon icon={faGear} className="text-gray-500" size="lg" />
          <span className="text-xs mt-1 text-gray-500">Settings</span>
        </Link>
      </nav>
    </main>
  )
}

