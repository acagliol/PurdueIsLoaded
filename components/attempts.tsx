"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator } from "@fortawesome/free-solid-svg-icons"
import { faDumbbell, faGear } from "@fortawesome/free-solid-svg-icons"

// Constants
const MAX_WEIGHT_LB = 2000
const MAX_WEIGHT_KG = Math.round(MAX_WEIGHT_LB / 2.20462)

// Types
type AttemptOption = {
  percent: number
  kg: number
  lb: number
}

type Calculations = {
  firstAttempt: AttemptOption[]
  secondAttempt: AttemptOption[]
  thirdAttempt: AttemptOption[]
}

type UnitType = "LB" | "KG"

export default function Attempts() {
  const [targetWeight, setTargetWeight] = useState<string>("")
  const [unit, setUnit] = useState<UnitType>("LB")
  const [calculations, setCalculations] = useState<Calculations>({
    firstAttempt: [
      { percent: 90, kg: 0, lb: 0 },
      { percent: 91, kg: 0, lb: 0 },
      { percent: 92, kg: 0, lb: 0 },
    ],
    secondAttempt: [
      { percent: 95, kg: 0, lb: 0 },
      { percent: 96, kg: 0, lb: 0 },
      { percent: 97, kg: 0, lb: 0 },
    ],
    thirdAttempt: [
      { percent: 99, kg: 0, lb: 0 },
      { percent: 100, kg: 0, lb: 0 },
      { percent: 102, kg: 0, lb: 0 },
    ],
  })

  // Handle input change with validation
  const handleInputChange = (text: string) => {
    // Simple regex to allow digits and one decimal point with one digit after it
    if (/^(\d+)?(\.\d{0,1})?$/.test(text)) {
      // Check if the value exceeds the maximum weight
      const numValue = Number.parseFloat(text) || 0
      const maxWeight = unit === "LB" ? MAX_WEIGHT_LB : MAX_WEIGHT_KG

      if (numValue > maxWeight) {
        // If exceeds max, show alert and set to max value
        alert(`The maximum weight allowed is ${maxWeight} ${unit}.`)
        setTargetWeight(maxWeight.toString())
      } else {
        setTargetWeight(text)
      }
    } else if (text === "") {
      // Allow empty input to clear the field
      setTargetWeight("")
    }
  }

  // Function to toggle between LB and KG
  const toggleUnit = () => {
    // Convert the current weight to the new unit
    const currentWeight = Number.parseFloat(targetWeight) || 0
    let newWeight: number

    if (unit === "LB") {
      // Convert from LB to KG (round to one decimal place)
      newWeight = Math.round((currentWeight / 2.20462) * 10) / 10
      setUnit("KG")
    } else {
      // Convert from KG to LB (round to one decimal place)
      newWeight = Math.round(currentWeight * 2.20462 * 10) / 10

      // Check if the converted value exceeds the maximum LB
      if (newWeight > MAX_WEIGHT_LB) {
        alert(`The converted weight (${newWeight} LB) exceeds the maximum of ${MAX_WEIGHT_LB} LB. Setting to maximum.`)
        newWeight = MAX_WEIGHT_LB
      }

      setUnit("LB")
    }

    // Update the target weight with the value rounded to one decimal place
    if (currentWeight > 0) {
      setTargetWeight(newWeight.toString())
    }
  }

  // Function to round to nearest 2.5kg (standard powerlifting increments)
  const roundToNearestPlate = (weight: number): number => {
    return Math.round(weight / 2.5) * 2.5
  }

  // Calculate weights based on target
  useEffect(() => {
    const targetValue = Number.parseFloat(targetWeight) || 0
    let targetKg: number

    // Convert to KG if needed
    if (unit === "LB") {
      targetKg = targetValue / 2.20462
    } else {
      targetKg = targetValue
    }

    const calculateAttempts = (percentages: number[]): AttemptOption[] => {
      return percentages.map((percent) => {
        const exactKg = (targetKg * percent) / 100
        const roundedKg = roundToNearestPlate(exactKg)
        const calculatedLb = Math.round(roundedKg * 2.20462)

        return {
          percent,
          kg: roundedKg,
          lb: calculatedLb,
        }
      })
    }

    setCalculations({
      firstAttempt: calculateAttempts([90, 91, 92]),
      secondAttempt: calculateAttempts([95, 96, 97]),
      thirdAttempt: calculateAttempts([99, 100, 102]),
    })
  }, [targetWeight, unit])

  // Check if we should show the calculator (when target weight is not empty)
  const showCalculator = targetWeight !== "" && Number.parseFloat(targetWeight) > 0

  // Render an attempt option card
  const renderAttemptOption = (option: AttemptOption) => (
    <div className="bg-gray-600 rounded-md overflow-hidden">
      <div className="p-2 text-center">
        <span className="text-2xl text-white">
          {option.percent} <span className="text-lg">%</span>
        </span>
      </div>
      <div className="border-t border-gray-700 p-2 text-center">
        <div className="text-2xl text-white">
          {unit === "KG" ? option.kg : option.lb} <span className="text-lg">{unit}</span>
        </div>
        <div className="text-2xl text-gray-400">
          {unit === "KG" ? option.lb : option.kg} <span className="text-lg">{unit === "KG" ? "LB" : "KG"}</span>
        </div>
      </div>
    </div>
  )

  // Define Purdue gold color
  const PURDUE_GOLD = "#CFB991"

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 text-center">
        <h1 className="text-2xl font-semibold">Attempts</h1>
      </header>

      {/* Tab Header */}
      <div className="border-b border-gray-800 text-center">
        <div className="inline-block border-b-2 border-[#CFB991] py-2 px-4">
          <span className="text-[#CFB991] font-medium">ATTEMPTS</span>
        </div>
      </div>

      <main className="flex-1 p-4 overflow-auto">
        {/* Target Weight */}
        <section className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">3rd Attempt Target</h2>
          <div className="flex justify-center items-center">
            <input
              className="w-44 h-12 bg-gray-600 rounded-md text-white text-2xl text-center"
              value={targetWeight}
              onChange={(e) => handleInputChange(e.target.value)}
              type="text"
              inputMode="decimal"
              maxLength={6}
              placeholder="0"
            />
            <button onClick={toggleUnit} className="ml-2 px-3 py-2 bg-gray-800 rounded-md border border-[#CFB991]">
              <span className="text-2xl font-bold text-[#CFB991]">{unit}</span>
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Max: {unit === "LB" ? MAX_WEIGHT_LB : MAX_WEIGHT_KG} {unit}
          </p>
        </section>

        {/* Only show calculator when target weight > 0 */}
        {showCalculator && (
          <>
            {/* 1ST ATTEMPT */}
            <section className="mb-6">
              <h3 className="text-2xl text-center mb-2">1ST ATTEMPT</h3>
              <div className="grid grid-cols-3 gap-2">
                {calculations.firstAttempt.map((option, i) => (
                  <div key={i}>{renderAttemptOption(option)}</div>
                ))}
              </div>
            </section>

            {/* 2ND ATTEMPT */}
            <section className="mb-6">
              <h3 className="text-2xl text-center mb-2">2ND ATTEMPT</h3>
              <div className="grid grid-cols-3 gap-2">
                {calculations.secondAttempt.map((option, i) => (
                  <div key={i}>{renderAttemptOption(option)}</div>
                ))}
              </div>
            </section>

            {/* 3RD ATTEMPT */}
            <section className="mb-6">
              <h3 className="text-2xl text-center mb-2">3RD ATTEMPT</h3>
              <div className="grid grid-cols-3 gap-2">
                {calculations.thirdAttempt.map((option, i) => (
                  <div key={i}>{renderAttemptOption(option)}</div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Purdue Motivation */}
        <section className="mb-6">
          <h3 className="text-2xl text-center text-[#CFB991] mb-4">BOILER UP!</h3>
          <div className="bg-gray-900 p-4 rounded-lg border border-[#CFB991]">
            <h4 className="text-lg font-bold text-[#CFB991] text-center mb-3">
              HAMMER DOWN! EVER GRATEFUL, EVER TRUE!
            </h4>

            <div className="flex items-center mb-3">
              <span className="text-xl text-[#CFB991] mr-2">🚂</span>
              <span className="text-white">Train like a Boilermaker, lift like a champion!</span>
            </div>

            <div className="flex items-center mb-3">
              <span className="text-xl text-[#CFB991] mr-2">💪</span>
              <span className="text-white">One More Rep! One More Set! One Brick Higher!</span>
            </div>

            <div className="flex items-center mb-3">
              <span className="text-xl text-[#CFB991] mr-2">🏆</span>
              <span className="text-white">The World's Strongest! Boiler Strong!</span>
            </div>

            <div className="flex items-center mb-3">
              <span className="text-xl text-[#CFB991] mr-2">⚒️</span>
              <span className="text-white">Hail Purdue! Let's break some PRs today!</span>
            </div>

            <div className="flex items-center">
              <span className="text-xl text-[#CFB991] mr-2">🔥</span>
              <span className="text-white">BTFU and crush that weight! CHOO CHOO!</span>
            </div>
          </div>
        </section>

        {/* Add padding at the bottom for the navigation bar */}
        <div className="h-20"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2">
        <div className="flex">
          <Link href="/" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faDumbbell} className="text-gray-400" size="lg" />
            <span className="text-xs text-gray-400 mt-1">Load the Bar</span>
          </Link>

          <Link href="/attempts" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faCalculator} className="text-[#CFB991]" size="lg" />
            <span className="text-xs text-[#CFB991] mt-1">Attempts</span>
          </Link>

          <Link href="/settings" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faGear} className="text-gray-400" size="lg" />
            <span className="text-xs text-gray-400 mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

