'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import teethLeft from '@/public/assets/teeth left.png'
import teethRight from '@/public/assets/teeth right.png'
import { recordsData } from './DetailedRecordView'
import TeethIcon from '@/public/assets/Vector_Teeth.svg'
import BrushIcon from '@/public/assets/Vector_Brush.svg'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

// 牙齿位置映射 (使用百分比)
const teethPositions = {
  left: {
    // 上排牙齿（从中间到外）
    11: { x: "25.65%", y: "61.81%" },  // 左上中切牙
    12: { x: "34.24%", y: "64.58%" },  // 左上侧切牙
    13: { x: "42.45%", y: "63.19%" },  // 左上尖牙
    14: { x: "51.95%", y: "60.65%" },  // 左上第一前磨牙
    15: { x: "58.07%", y: "58.10%" },  // 左上第二前磨牙
    16: { x: "66.28%", y: "53.24%" },  // 左上第一磨牙
    17: { x: "72.92%", y: "47.92%" },  // 左上第二磨牙
    18: { x: "77.47%", y: "44.21%" },  // 左上第三磨牙

    // 下排牙齿（从中间到外）
    41: { x: "27.08%", y: "73.84%" },  // 左下中切牙
    42: { x: "32.29%", y: "73.61%" },  // 左下侧切牙
    43: { x: "38.28%", y: "75.69%" },  // 左下尖牙
    44: { x: "47.92%", y: "73.15%" },  // 左下第一前磨牙
    45: { x: "55.08%", y: "68.06%" },  // 左下第二前磨牙
    46: { x: "63.67%", y: "63.66%" },  // 左下第一磨牙
    47: { x: "71.09%", y: "57.64%" },  // 左下第二磨牙
    48: { x: "77.21%", y: "50.93%" },  // 左下第三磨牙
  },
  right: {
    // 上排牙齿（从中间到外）
    21: { x: "74.29%", y: "60.19%" },  // 右上中切牙
    22: { x: "65.69%", y: "64.12%" },  // 右上侧切牙
    23: { x: "57.42%", y: "62.96%" },  // 右上尖牙
    24:{ x: "48.96%", y: "61.57%" },  // 右上第一前磨牙
    25: { x: "41.80%", y: "57.64%" },  // 右上第二前磨牙
    26:{ x: "33.59%", y: "52.78%" },  // 右上第一磨牙
    27: { x: "27.60%", y: "47.92%" },  // 右上第二磨牙
    28: { x: "22.66%", y: "43.98%" },  // 右上第三磨牙

    // 下排牙齿（从中间到外）
    31: { x: "73.18%", y: "74.07%" },  // 右下中切牙
    32: { x: "67.84%", y: "74.31%" },  // 右下侧切牙
    33: { x: "61.85%", y: "75.69%" },  // 右下尖牙
    34: { x: "52.60%", y: "72.92%" },  // 右下第一前磨牙
    35: { x: "45.44%", y: "68.06%" },  // 右下第二前磨牙
    36: { x: "36.59%", y: "63.19%" },  // 右下第一磨牙
    37: { x: "29.30%", y: "57.18%" },  // 右下第二磨牙
    38: { x: "22.92%", y: "51.16%" },  // 右下第三磨牙
  }
}

export default function TeethModel({ patientId }) {
  const [currentView, setCurrentView] = useState('left')
  const [selectedTooth, setSelectedTooth] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const router = useRouter()

  // 处理屏幕大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 从recordsData中提取有问题的牙齿
  const problematicTeeth = recordsData.reduce((acc, record) => {
    const extractToothNumber = (text) => {
      const match = text.match(/tooth #(\d+)/i)
      return match ? match[1] : null
    }

    record.diagnosis.conditions.forEach(condition => {
      const toothNumber = extractToothNumber(condition)
      if (toothNumber) {
        if (!acc[toothNumber]) {
          acc[toothNumber] = {
            id: record.id,
            diagnoses: [],
            treatments: []
          }
        }
        acc[toothNumber].diagnoses.push({
          name: condition,
          recordId: record.id
        })
      }
    })

    record.treatmentRecords.procedures.forEach(procedure => {
      const toothNumber = extractToothNumber(procedure)
      if (toothNumber && acc[toothNumber]) {
        acc[toothNumber].treatments.push({
          name: procedure,
          recordId: record.id
        })
      }
    })

    return acc
  }, {})

  const handleToothClick = (toothNumber) => {
    setSelectedTooth(selectedTooth === toothNumber ? null : toothNumber)
  }

  const getCardPosition = (toothX) => {
    const xPercent = parseFloat(toothX)
    return xPercent > 50 ? 'left' : 'right'
  }

  const handleRecordClick = (recordId) => {
    router.push(`/patient-portal/${patientId}/record/${recordId}`)
  }

  const isToothVisible = (toothNum, view) => {
    return teethPositions[view]?.[toothNum] !== undefined
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
    if (selectedTooth && !isToothVisible(selectedTooth, view)) {
      setSelectedTooth(null)
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="relative 2xl:px-[350px] transition-all duration-300">
          <div 
            ref={containerRef}
            className="relative w-full aspect-video max-w-4xl mx-auto"
          >
            <Image
              src={currentView === 'left' ? teethLeft : teethRight}
              alt={`Teeth ${currentView} View`}
              className="w-full h-full object-contain"
              width={800}
              height={600}
              priority
            />
            
            <svg 
              className="absolute inset-0 w-full h-full"
            >
              {Object.entries(problematicTeeth).map(([toothNum, data]) => {
                const position = teethPositions[currentView]?.[toothNum]
                if (!position) return null

                const isSelected = selectedTooth === toothNum

                return (
                  <g key={toothNum}>
                    {/* 牙齿圆点 */}
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r="1.5%"
                      fill={isSelected ? "#7B61FF" : "#FFFFFF"}
                      stroke="#7B61FF"
                      strokeWidth="2"
                      className="cursor-pointer hover:fill-[#7B61FF] transition-colors pointer-events-auto"
                      onClick={() => handleToothClick(toothNum)}
                    />
                  </g>
                )
              })}
            </svg>
          </div>

          {selectedTooth && problematicTeeth[selectedTooth] && isToothVisible(selectedTooth, currentView) && (
            <>
              {/* 2xl屏幕 - 两侧显示 */}
              <div className="hidden 2xl:block">
                <div 
                  className={`
                    absolute w-[400px]
                    ${getCardPosition(teethPositions[currentView][selectedTooth].x) === 'left' 
                      ? 'left-[50px]' 
                      : 'right-[50px]'
                    } top-0 transform -translate-y-1/2
                  `}
                  style={{ 
                    top: `${teethPositions[currentView][selectedTooth].y}`
                  }}
                >
                  <Card className="bg-white shadow-lg border-2 border-[#7B61FF]">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl lg:text-2xl">Associated Records</CardTitle>
                        <button 
                          onClick={() => setSelectedTooth(null)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {problematicTeeth[selectedTooth].diagnoses.length > 0 && (
                        <div className="space-y-3">
                          <div className="grid gap-3">
                            {problematicTeeth[selectedTooth].diagnoses.map((diagnosis, index) => (
                              <div 
                                key={index}
                                onClick={() => handleRecordClick(diagnosis.recordId)}
                                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                              >
                                <div className="flex-shrink-0 p-1">
                                  <TeethIcon className="w-6 h-6 text-[#7B61FF]" />
                                </div>
                                <span className="text-base flex-1 group-hover:text-[#7B61FF] transition-colors">
                                  {diagnosis.name}
                                </span>
                                <span className="text-sm text-[#7B61FF] font-medium">#{diagnosis.recordId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {problematicTeeth[selectedTooth].treatments.length > 0 && (
                        <div className="space-y-3">
                          <div className="grid gap-3">
                            {problematicTeeth[selectedTooth].treatments.map((treatment, index) => (
                              <div 
                                key={index}
                                onClick={() => handleRecordClick(treatment.recordId)}
                                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                              >
                                <div className="flex-shrink-0 p-1">
                                  <BrushIcon className="w-6 h-6 text-[#7B61FF]" />
                                </div>
                                <span className="text-base flex-1 group-hover:text-[#7B61FF] transition-colors">
                                  {treatment.name}
                                </span>
                                <span className="text-sm text-[#7B61FF] font-medium">#{treatment.recordId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* xl及以下屏幕 - 下方显示 */}
              <div className="2xl:hidden w-full">
                <div className="w-full max-w-[800px] xl:max-w-[700px] lg:max-w-[600px] md:max-w-[500px] sm:max-w-[90vw] mx-auto mt-6">
                  <Card className="bg-white shadow-lg border-2 border-[#7B61FF]">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl lg:text-2xl">Associated Records</CardTitle>
                        <button 
                          onClick={() => setSelectedTooth(null)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {problematicTeeth[selectedTooth].diagnoses.length > 0 && (
                        <div className="space-y-3">
                          <div className="grid gap-3">
                            {problematicTeeth[selectedTooth].diagnoses.map((diagnosis, index) => (
                              <div 
                                key={index}
                                onClick={() => handleRecordClick(diagnosis.recordId)}
                                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                              >
                                <div className="flex-shrink-0 p-1">
                                  <TeethIcon className="w-6 h-6 text-[#7B61FF]" />
                                </div>
                                <span className="text-base flex-1 group-hover:text-[#7B61FF] transition-colors">
                                  {diagnosis.name}
                                </span>
                                <span className="text-sm text-[#7B61FF] font-medium">#{diagnosis.recordId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {problematicTeeth[selectedTooth].treatments.length > 0 && (
                        <div className="space-y-3">
                          <div className="grid gap-3">
                            {problematicTeeth[selectedTooth].treatments.map((treatment, index) => (
                              <div 
                                key={index}
                                onClick={() => handleRecordClick(treatment.recordId)}
                                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                              >
                                <div className="flex-shrink-0 p-1">
                                  <BrushIcon className="w-6 h-6 text-[#7B61FF]" />
                                </div>
                                <span className="text-base flex-1 group-hover:text-[#7B61FF] transition-colors">
                                  {treatment.name}
                                </span>
                                <span className="text-sm text-[#7B61FF] font-medium">#{treatment.recordId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-36 mt-10">
          <button
            onClick={() => handleViewChange('left')}
            className="p-2 hover:scale-110 transition-transform bg-[#D9D9D9] border-2 border-[#7B61FF] rounded-full"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`${currentView === 'left' ? 'text-[#7B61FF]' : 'text-black'}`}
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={() => handleViewChange('right')}
            className="p-2 hover:scale-110 transition-transform bg-[#D9D9D9] border-2 border-[#7B61FF] rounded-full"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`${currentView === 'right' ? 'text-[#7B61FF]' : 'text-black'}`}
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 