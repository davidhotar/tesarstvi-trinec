import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ImagePlaceholder } from './ImagePlaceholder'
import { IconPhone, IconShieldLock, IconMapPinFilled } from '@tabler/icons-react'

const serviceOptions = ['Pergola', 'Přístřešek', 'Dřevostavba', 'Terasa', 'Jiné']

export function ContactSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Řekněte, co plánujete.
                <br />
                Zbytek je na nás.
              </h2>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <IconMapPinFilled className="mt-0.5 size-4 shrink-0 text-primary" />
              Stavíme v okruhu 40 km od Třince — Bystřice, Návsí, Mosty, Jablunkov,
              Český Těšín, Vendryně, Hrádek a okolí.
            </div>
            <ImagePlaceholder
              label="MAPA — service area pin map, Třinec center, 40km radius"
              className="h-[260px] rounded-xl"
            />
            <div className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconPhone className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Volejte (Po–Pá 7–17)
                </p>
                <p className="font-heading text-xl font-bold">+420 605 ___ ___</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Nezávazná poptávka
              </p>
              <h3 className="font-heading text-xl font-bold">Ozveme se do 24 hodin</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Jméno</Label>
                  <Input placeholder="Jan Novák" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Telefon</Label>
                  <Input placeholder="+420 ___ ___ ___" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>E-mail</Label>
                <Input placeholder="vas@email.cz" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>O co máte zájem?</Label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((opt) => (
                    <Badge key={opt} variant="outline" className="cursor-pointer">
                      {opt}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Zpráva</Label>
                <Textarea placeholder="Stručně popište, co plánujete..." />
              </div>
              <Button size="lg" className="w-full rounded-full">
                Odeslat poptávku
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <IconShieldLock className="size-3.5" />
                Vaše údaje jsou v bezpečí · GDPR
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
