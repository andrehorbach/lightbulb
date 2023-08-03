'use client'
import { useState } from 'react';

export default function Home() {
  const [andarMaximo, setAndarMaximo] = useState<string>('');
  const [totalAndaresFinal, setTotalAndaresFinal] = useState<number | null>(null);
  const [steps, setSteps] = useState<string>('');

  function encontrarAndar(andarMaximo: number) {
    const maxAndares = 100;
    const intervalo = 10;
    let testesPrimeiraLampada = 0;
    let testesSegundaLampada = 0;

    setSteps(`Iniciando o teste para encontrar em que andar a lâmpada se quebra: (${andarMaximo}).\n`);

    // Passo 1: testar andares em intervalos de 10 - Binary Search
    for (let andar = intervalo; andar <= maxAndares; andar += intervalo) {
      testesPrimeiraLampada++;
      setSteps((prevSteps) => prevSteps + `Primeira lâmpada inicia teste em: ${andar}.\n`);
      if (andar >= andarMaximo) {
        const andarInicial = andar - intervalo + 1;
        for (let i = andarInicial; i <= andar; i++) {
          testesSegundaLampada++;
          setSteps((prevSteps) => prevSteps + `Segunda lâmpada inicia teste em: ${i}.\n`);
          if (i >= andarMaximo) {
            setSteps((prevSteps) => prevSteps + `A segunda lâmpada quebrou no andar ${i}.\n`);
            setTotalAndaresFinal(i);
            return;
          }
        }
      }
    }

    // Se o loop terminar sem retorno, o andar é 100.
    setSteps((prevSteps) => prevSteps + 
      `A primeira lâmpada não quebrou em nenhum andar, 
      então o andar onde ela deverá quebrar é o ${maxAndares}.\n`
    );
    setTotalAndaresFinal(maxAndares);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Consulting firm test - light bulb drop&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By André Horbach
          </a>
        </div>
      </div>
      <div className="mt-20">
        <p>
          - O objetivo deste teste é encontrar o andar a partir do qual as lâmpadas quebram.
        </p>
        <p>
          - Para isso, será utilizada a estratégia da busca binária (Binary Search)
        </p>
        <div className="mt-10">
          <p> Digite o andar que a lâmpada deverá quebrar:</p><br/>
          <input
            type="number"
            placeholder="Andar a quebrar"
            value={andarMaximo}
            onChange={(e) => setAndarMaximo(e.target.value)}
            style={{color:'black', padding: 10, width: '250px'}}
          />

          <button 
            onClick={() => encontrarAndar(parseInt(andarMaximo))} 
            style={{
              backgroundColor: 'grey',
              border: '1px solid white',
              padding: '10px'
            }}
            >
            INICIAR
          </button>
        </div>
        {totalAndaresFinal !== null && (
          <div className="mt-4" style={{ color: 'limegreen'}}>
            O andar a partir do qual a lâmpada deverá quebrar é: {totalAndaresFinal}.
          </div>
        )}
        <div className="mt-4" style={{ color: 'limegreen'}}>
          <pre>
            {steps}
          </pre>
        </div>
      </div>
    </main>
  )
}