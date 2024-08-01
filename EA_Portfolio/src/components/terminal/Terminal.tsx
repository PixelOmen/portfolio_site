import { useRef, useEffect, useState } from "react";

interface PromptObject {
  block: HTMLDivElement;
  text: string;
  prompt: HTMLSpanElement;
  content: HTMLSpanElement;
}

interface TerminalProps {
  content: string;
  header?: string;
  typeSpeed?: number;
  className?: string;
  triggered?: boolean;
}

export default function Terminal({
  content,
  header = 'Emmanuel@Acosta',
  typeSpeed = 5,
  className = '',
  triggered = false,
}: TerminalProps ) {

  const [reset, setReset] = useState(false);
  const resetRef = useRef(reset);
  const contentRef = useRef<HTMLDivElement>(null);
  
  content = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quos beatae minus alias eos veritatis, rerum, \ndistinctio voluptates dolorum ilload exercitationem, quibusdam officia. \nUnde et doloremque incidunt sed deserunt!";
  
  const contentBlocks = content.split('\n');

  function promptElements(header: string, content: string, blockIndex: number, shapeholder: boolean) {
    return (
      <div key={blockIndex} data-blockindex={blockIndex} className="mb-4">
        <span data-subtype='prompt' className="text-[#26e026] opacity-0">
          {header}:~$
        </span>
        <span data-subtype='content' className="ml-4 text-gray-100">
          {shapeholder ? content : ''}
        </span>
      </div>
    )
  }

  function createPrompts(shapeholder: boolean) {
    return (
      contentBlocks.map((item, index) => {
        return (
          promptElements(header, item, index, shapeholder)
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
        if (elem.dataset.subtype === 'prompt') {
          promptObject.prompt = elem;
        }
        if (elem.dataset.subtype === 'content') {
          promptObject.content = elem;
        }
      }
      if (!promptObject.prompt || !promptObject.content) {
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
      currentBlock.prompt.classList.remove('opacity-0');
    }
    
    if (textIndex >= currentBlock.text.length) {
      if (blockIndex + 1 >= prompts.length) return;
      typewriter(prompts, 0, blockIndex + 1);
    } else {
      let firstCharTimeout = textIndex === 0 ? 400 : 0;
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
      prompt.content.textContent = '';
    });
  }
  

  
  useEffect(() => {
    if (triggered) {
      setReset(false);
    } else {
      setReset(true);
    }
  }, [triggered]);

  useEffect(() => {
    resetRef.current = reset;
    if (reset) {
      resetPrompts();
    } else {
      animatePrompts();
    }
  }, [reset]);
  
  return (
    <div className={`mb-4 w-full overflow-hidden ${className}`}>
      <div className="text-gray-200 text-sm">

        <header>        
          <div className="relative w-full flex p-2 rounded-t-lg bg-gradient-to-b from-[#524f48] via-[#3e3d39] to-[#3e3d39]">
            <div className="absolute left-[50%] -translate-x-[50%]">
              {header}: ~
            </div>
            <div className="flex ml-auto gap-1 pr-1">
              <div className="border-[1px] border-black rounded-full px-2 pt-[1px] text-black bg-gradient-to-b from-[#82817c] to-[#64635e]">
                &minus;
              </div>
              <div className="border-[1px] border-black rounded-full px-2 text-black bg-gradient-to-b from-[#82817c] to-[#64635e]">
                <div className="-translate-y-[1px]">&#9633;</div>
              </div>
              <div className="border-[1px] border-black rounded-full px-2 pt-[1px] text-black bg-gradient-to-b from-[#ef7d52] to-[#de4f1b]">
                &times;
              </div>
            </div>
          </div>
          <div className="pl-6 pb-2 pt-2 flex gap-4 bg-[#373632]">
            {['File', 'Edit', 'View', 'Search', 'Terminal', 'Help'].map((item, index) => {
              return (
                <div key={index}>{item}</div>
              )
            })}
          </div>
        </header>

        <div className="relative bg-gray-900 w-full font-sourcecode p-2 text-lg rounded-sm">
          {/* shapeholder */}
          <div className="opacity-0">
            {createPrompts(true)}
          </div>

          {/* content */}
          <article
            ref={contentRef}
            className="absolute top-2 left-2"
          >
            {createPrompts(false)}
          </article>
        </div>

      </div>
    </div>
  )
}
