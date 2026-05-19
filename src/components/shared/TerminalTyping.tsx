'use client';

import { useState, useEffect, useCallback } from 'react';

interface TerminalTypingProps {
  commands: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TerminalTyping({
  commands,
  typingSpeed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className = '',
}: TerminalTypingProps) {
  const [displayText, setDisplayText] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const currentCommand = commands[commandIndex];

  const typeNextChar = useCallback(() => {
    if (isDeleting) {
      setDisplayText((prev) => prev.slice(0, -1));
      if (displayText.length <= 1) {
        setIsDeleting(false);
        setCommandIndex((prev) => (prev + 1) % commands.length);
      }
    } else {
      setDisplayText(currentCommand.slice(0, displayText.length + 1));
      if (displayText.length + 1 >= currentCommand.length) {
        setIsTyping(false);
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
  }, [isDeleting, displayText, currentCommand, pauseDuration, commands.length]);

  useEffect(() => {
    if (!isTyping && !isDeleting) return;

    const speed = isDeleting ? deleteSpeed : typingSpeed;
    const timer = setTimeout(typeNextChar, speed + Math.random() * 20);
    return () => clearTimeout(timer);
  }, [displayText, isTyping, isDeleting, typingSpeed, deleteSpeed, typeNextChar]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  // Syntax highlighting for the display text
  const renderHighlightedText = (text: string) => {
    if (!text) return null;

    // Simple syntax highlighting rules
    const parts: { text: string; color: string }[] = [];
    let remaining = text;

    // Highlight commands (words before first space or after >)
    const cmdMatch = remaining.match(/^(>\s*)(\S+)(.*)$/);
    if (cmdMatch) {
      parts.push({ text: cmdMatch[1], color: 'text-indigo-400' });
      parts.push({ text: cmdMatch[2], color: 'text-emerald-400' });
      remaining = cmdMatch[3];
    }

    // Highlight strings in quotes
    const stringRegex = /("[^"]*")/g;
    const tokens: { text: string; color: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = stringRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ text: remaining.slice(lastIndex, match.index), color: 'text-foreground/60' });
      }
      tokens.push({ text: match[1], color: 'text-amber-400' });
      lastIndex = match.index + match[1].length;
    }

    if (lastIndex < remaining.length) {
      tokens.push({ text: remaining.slice(lastIndex), color: 'text-foreground/60' });
    }

    if (tokens.length === 0 && remaining) {
      tokens.push({ text: remaining, color: 'text-foreground/60' });
    }

    return (
      <>
        {parts.map((p, i) => (
          <span key={`cmd-${i}`} className={p.color}>{p.text}</span>
        ))}
        {tokens.map((t, i) => (
          <span key={`tok-${i}`} className={t.color}>{t.text}</span>
        ))}
        <span
          className={`inline-block w-[2px] h-[1.1em] bg-indigo-400 ml-[2px] align-middle ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </>
    );
  };

  return (
    <div
      className={`font-mono text-[11px] sm:text-[12px] leading-relaxed ${className}`}
    >
      {renderHighlightedText(displayText)}
    </div>
  );
}
