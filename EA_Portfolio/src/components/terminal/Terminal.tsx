import { useRef, useEffect, useState } from "react";

import styles from './terminal.module.css';

interface PromptObject {
  block: HTMLDivElement;
  text: string;
  prompt: HTMLSpanElement;
  content: HTMLSpanElement;
  cursor: HTMLSpanElement;
}

interface TerminalProps {
  content: string;
  header?: string;
  userName?: string;
  typeSpeed?: number;
  newLinePause?: number;
  className?: string;
  triggered?: boolean;
}

export default function Terminal({
  content,
  header = 'Emmanuel@Acosta',
  userName = 'eacosta@dev',
  typeSpeed = 0,
  newLinePause = 1000,
  className = '',
  triggered = false,
}: TerminalProps ) {

  const [reset, setReset] = useState(false);
  const [livePrompts, setLivePrompts] = useState<JSX.Element[]>([]);
  const resetRef = useRef(reset);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const contentBlocks = content.split('\\n');

  function promptElements(content: string, blockIndex: number, shapeholder: boolean) {
    return (
      <div key={blockIndex} data-blockindex={blockIndex} className="mb-4">
        <span data-subtype='prompt' className="text-[#26e026]">
          {userName ? userName : header}:~$
        </span>
        <span data-subtype='content' className="ml-4 text-gray-200">
          {shapeholder ? content : ''}
        </span>
        <span data-subtype='cursor' className={`${styles.cursorBlink} opacity-0`}>
          <div className={`inline-block w-3 h-5 translate-y-1 bg-gray-300`}></div>
        </span>
      </div>
    )
  }

  function createPrompts(shapeholder: boolean) {
    return (
      contentBlocks.map((item, index) => {
        return (
          promptElements(item, index, shapeholder)
        )
      })
    )
  }

  function getPromptElements(): PromptObject[] {
    if (!contentRef.current) throw new Error('contentRef is null');
    const DOMblocks = contentRef.current.children;
    let promptElements: PromptObject[] = [];
    for (let i = 0; i < DOMblocks.length; i++) {
      const block = DOMblocks[i] as HTMLDivElement;
      const promptObject = { block: block, text: contentBlocks[i] } as PromptObject;
      for (let j = 0; j < block.children.length; j++) {
        const elem = block.children[j] as HTMLSpanElement;
        switch (elem.dataset.subtype) {
          case 'prompt':
            promptObject.prompt = elem;
            break;
          case 'content':
            promptObject.content = elem;
            break;
          case 'cursor':
            promptObject.cursor = elem;
            break;
        }      
      }
      if (!promptObject.prompt || !promptObject.content || !promptObject.cursor) {
        throw new Error('promptObject is missing prompt or content');
      }        
      promptElements.push(promptObject);
    }
    return promptElements;
  }



  function animatePrompts() {
    if (!contentRef.current) return;
    const promptElements = getPromptElements();
    typewriter(promptElements);
  }



  function typewriter(
    prompts: PromptObject[],
    textIndex = 0,
    blockIndex = 0
  ) {
    if ( resetRef.current ) return;

    const currentBlock = prompts[blockIndex];

    if (textIndex === 0) {
      currentBlock.cursor.classList.add(styles.cursorBlink);
      currentBlock.prompt.classList.remove('opacity-0');
    }
    
    if (textIndex >= currentBlock.text.length) {
      if (blockIndex + 1 >= prompts.length) return;
      currentBlock.cursor.classList.remove(styles.cursorBlink);
      typewriter(prompts, 0, blockIndex + 1);
    } else {
      let firstCharTimeout = textIndex === 0 ? newLinePause : 0;
      setTimeout(() => {
        if ( resetRef.current ) return;
        const contentElem = currentBlock.content;
        contentElem.textContent = contentElem.textContent ? contentElem.textContent : '';
        contentElem.textContent += currentBlock.text[textIndex];
        setTimeout(() => {
          if ( resetRef.current ) return;
          typewriter(prompts, textIndex + 1, blockIndex);
        }, typeSpeed);
      }, firstCharTimeout);
    }    
  }



  function resetPrompts() {
    const promptElements = getPromptElements();
    promptElements.forEach(prompt => {
      prompt.prompt.classList.add('opacity-0');
      prompt.cursor.classList.remove(styles.cursorBlink);
      prompt.content.textContent = '';
    });
  }

  useEffect(() => {
    setLivePrompts(createPrompts(false));
  }, []);
  
  useEffect(() => {
    if (triggered) {
      setReset(false);
    } else {
      setReset(true);
    }
  }, [triggered]);

  useEffect(() => {
    resetRef.current = reset;
    if (livePrompts.length < 1) return;
    if (reset) {
      resetPrompts();
    } else {
      animatePrompts();
    }
  }, [reset]);
  
  return (
    <div className={`mb-4 w-full overflow-hidden ${className}`}>
      <div className="text-gray-200 text-[0.5rem] sm:text-sm">

        <header>        
          <div className="relative w-full flex p-2 rounded-t-lg bg-gradient-to-b from-[#524f48] via-[#3e3d39] to-[#3e3d39]">
            <div className="absolute left-[50%] -translate-x-[50%]">
              {header}: ~
            </div>
            <div className="flex ml-auto gap-1 pr-1">
              <div className="border-[1px] border-black rounded-full px-1 sm:px-2 pt-[1px] text-black bg-gradient-to-b from-[#82817c] to-[#64635e] cursor-default">
                &minus;
              </div>
              <div className="border-[1px] border-black rounded-full px-1 sm:px-2 text-black bg-gradient-to-b from-[#82817c] to-[#64635e] cursor-default">
                <div className="-translate-y-[1px]">&#9633;</div>
              </div>
              <div className="border-[1px] border-black rounded-full px-1 sm:px-2 pt-[1px] text-black bg-gradient-to-b from-[#ef7d52] to-[#de4f1b] cursor-pointer">
                &times;
              </div>
            </div>
          </div>
          <div className="pl-2 sm:pl-6 py-1 sm:py-2 flex gap-4 bg-[#373632]">
            {['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'].map((item, index) => {
              return (
                <div key={index}>{item}</div>
              )
            })}
          </div>
        </header>

        <div className="relative bg-[#2b1825cf] w-full font-sourcecode text-lg rounded-b-lg ">      

          {/* shapeholder */}
          <div className="leading-6 text-xs sm:text-lg opacity-0 p-3 sm:p-2">
            {createPrompts(true)}
          </div>

          {/* content */}
          <article
            ref={contentRef}
            className="absolute top-2 left-2 leading-6 text-xs sm:text-lg pr-2"
          >
            {livePrompts}
          </article>

        </div>

      </div>
    </div>
  )
}
