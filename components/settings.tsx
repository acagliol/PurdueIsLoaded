"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator } from "@fortawesome/free-solid-svg-icons"
import { faDumbbell, faGear } from "@fortawesome/free-solid-svg-icons"
import { IoInformationCircleOutline, IoTrophyOutline, IoHammerOutline } from "react-icons/io5"

const PURDUE_GOLD = "#CFB991"

export default function Settings() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 text-center">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </header>

      {/* Tab Header */}
      <div className="border-b border-gray-800 text-center">
        <div className="inline-block border-b-2 border-[#CFB991] py-2 px-4">
          <span className="text-[#CFB991] font-medium">SETTINGS</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 pb-24">
        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-bold text-[#CFB991] text-center mb-1">Boilermaker Powerlifting</h3>
            <p className="text-sm text-gray-400 text-center mb-4">Version 1.0.0</p>

            <div className="flex items-center mb-3">
              <IoInformationCircleOutline size={20} color={PURDUE_GOLD} className="mr-3" />
              <p className="text-white">Created by Alejo Cagliolo</p>
            </div>

            <div className="flex items-center mb-3">
              <IoTrophyOutline size={20} color={PURDUE_GOLD} className="mr-3" />
              <p className="text-white">Helping Boilermakers break PRs since 2023</p>
            </div>

            <div className="flex items-center">
              <IoHammerOutline size={20} color={PURDUE_GOLD} className="mr-3" />
              <p className="text-white">Hammer Down! Ever Grateful, Ever True!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2">
        <div className="flex">
          <Link href="/" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faDumbbell} className="text-gray-400" size="lg" />
            <span className="text-xs text-gray-400 mt-1">Load the Bar</span>
          </Link>

          <Link href="/attempts" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faCalculator} className="text-gray-400" size="lg" />
            <span className="text-xs text-gray-400 mt-1">Attempts</span>
          </Link>

          <Link href="/settings" className="flex-1 flex flex-col items-center">
            <FontAwesomeIcon icon={faGear} className="text-[#CFB991]" size="lg" />
            <span className="text-xs text-[#CFB991] mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

