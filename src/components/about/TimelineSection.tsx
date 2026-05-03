const milestones = [
  {
    year: '1998',
    title: 'První hoblík',
    text: 'Jako čtrnáctiletý kluk v dílně u dědy. Roubenka, která stojí dodnes.',
  },
  {
    year: '2003',
    title: 'Vyučení tesařem',
    text: 'SOU stavební Frýdek-Místek. Práce na krovech v Beskydech.',
  },
  {
    year: '2014',
    title: 'Vlastní firma',
    text: 'Z garáže přístavby u rodičů. První pergola — pro souseda. Stojí.',
  },
  {
    year: '2019',
    title: 'Dílna v Třinci',
    text: 'Vlastní hala, CNC frézka, sklad modřínu. Tým se rozrostl o syna.',
  },
  {
    year: '2024',
    title: '180. realizace',
    text: 'Pergola pro rodinu z Bystřice. Pivo a děkujeme do týdne.',
  },
  {
    year: 'dnes',
    title: 'Tým 4 lidí',
    text: 'Stále malá rodinná dílna. Stále všechno dělám se synem.',
  },
]

export function TimelineSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
<h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Cesta od učedníka k vlastní dílně.
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical dashed line — stops at the last item */}
          <div
            aria-hidden
            className="absolute top-0 bottom-12 left-4 w-px border-l border-dashed border-border lg:left-1/2 lg:-translate-x-px lg:bottom-16"
          />

          <div className="flex flex-col gap-12 lg:gap-16">
            {milestones.map((m, i) => {
              const isRight = i % 2 === 1
              return (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-8 ${isRight ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Content card */}
                  <div
                    className={`ml-12 flex-1 lg:ml-0 ${isRight ? 'lg:text-left' : 'lg:text-right'}`}
                  >
                    <div
                      className={`inline-block rounded-xl border bg-card p-5 text-left shadow-sm`}
                    >
                      <p className="font-heading text-lg font-bold">{m.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {m.text}
                      </p>
                    </div>
                  </div>

                  {/* Year circle */}
                  <div className="absolute left-0 flex size-9 items-center justify-center rounded-full border-2 bg-background text-xs font-bold text-primary shadow-sm lg:static lg:size-16 lg:text-base">
                    {m.year}
                  </div>

                  {/* Empty spacer for opposite side */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
