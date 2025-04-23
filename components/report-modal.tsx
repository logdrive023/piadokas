"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle2, ChevronRight, Flag } from "lucide-react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  contentType: "comment" | "post"
  contentId: string
}

type ReportReason = {
  id: string
  label: string
  description: string
}

export function ReportModal({ isOpen, onClose, contentType, contentId }: ReportModalProps) {
  const [step, setStep] = useState(1)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reportReasons: ReportReason[] = [
    {
      id: "inappropriate",
      label: "Conteúdo inapropriado",
      description: "Conteúdo sexual, violento ou ofensivo que viola as diretrizes da comunidade",
    },
    {
      id: "harassment",
      label: "Assédio ou bullying",
      description: "Comportamento que intimida, humilha ou ameaça outros usuários",
    },
    {
      id: "hate-speech",
      label: "Discurso de ódio",
      description: "Conteúdo que promove ódio ou violência contra grupos protegidos",
    },
    {
      id: "misinformation",
      label: "Desinformação",
      description: "Informações falsas ou enganosas que podem causar danos",
    },
    {
      id: "spam",
      label: "Spam ou conteúdo comercial",
      description: "Mensagens repetitivas ou promoção não solicitada de produtos/serviços",
    },
    {
      id: "copyright",
      label: "Violação de direitos autorais",
      description: "Uso não autorizado de conteúdo protegido por direitos autorais",
    },
    {
      id: "other",
      label: "Outro motivo",
      description: "Outro problema não listado acima",
    },
  ]

  const handleNext = () => {
    if (step === 1 && !selectedReason) return
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulação de envio da denúncia
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setStep(3)
  }

  const handleClose = () => {
    // Reset state when closing
    setStep(1)
    setSelectedReason(null)
    setAdditionalInfo("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md w-full sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Flag className="h-5 w-5 text-red-500" />
            Denunciar {contentType === "comment" ? "comentário" : "post"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <p className="text-gray-300 text-sm">Ajude-nos a entender o problema. Qual é o motivo da sua denúncia?</p>

            <RadioGroup value={selectedReason || ""} onValueChange={setSelectedReason} className="space-y-3">
              {reportReasons.map((reason) => (
                <div key={reason.id} className="flex items-start space-x-2 bg-gray-700 p-3 rounded-md">
                  <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                  <Label htmlFor={reason.id} className="flex-1 cursor-pointer">
                    <span className="font-medium text-white">{reason.label}</span>
                    <p className="text-sm text-gray-400">{reason.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-end pt-2">
              <Button
                onClick={handleNext}
                disabled={!selectedReason}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="bg-amber-900/20 border border-amber-800 rounded-md p-3 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-medium">Informações adicionais</p>
                <p className="text-amber-200/80 text-sm">
                  Forneça detalhes que possam nos ajudar a entender melhor o problema. Todas as denúncias são
                  confidenciais.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-info" className="text-white">
                Detalhes adicionais (opcional)
              </Label>
              <Textarea
                id="additional-info"
                placeholder="Descreva o problema com mais detalhes..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white resize-none min-h-[120px]"
              />
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={handleBack} className="border-gray-600 text-gray-300">
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </>
                ) : (
                  "Enviar denúncia"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-white">Denúncia enviada!</h3>
            <p className="text-gray-300">
              Agradecemos por ajudar a manter nossa comunidade segura. Nossa equipe de moderação irá analisar sua
              denúncia o mais breve possível.
            </p>
            <Button onClick={handleClose} className="bg-purple-600 hover:bg-purple-700 text-white mt-2">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReportModal
