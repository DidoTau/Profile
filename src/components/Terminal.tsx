"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface TerminalLine {
  text: string;
  type?: "normal" | "dim" | "bright" | "ascii" | "link";
  href?: string;
}

const BOOT_SEQUENCE: string[] = [
  "BIOS v3.14 ... OK",
  "Memory test: 640K ... OK",
  "Loading kernel modules ...",
  "Mounting /dev/profile ...",
  "Starting esteban-ramirez-os v2.0.24 ...",
  "",
  "System ready.",
  "",
];

const ASCII_NAME = `
 ███████╗███████╗████████╗███████╗██████╗  █████╗ ███╗   ██╗
 ██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗████╗  ██║
 █████╗  ███████╗   ██║   █████╗  ██████╔╝███████║██╔██╗ ██║
 ██╔══╝  ╚════██║   ██║   ██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║
 ███████╗███████║   ██║   ███████╗██████╔╝██║  ██║██║ ╚████║
 ╚══════╝╚══════╝   ╚═╝   ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const WELCOME_LINES: TerminalLine[] = [
  { text: ASCII_NAME, type: "ascii" },
  { text: "" },
  { text: "  Esteban Ramírez Fuenzalida", type: "bright" },
  { text: "  Ingeniero Civil en Computación | Líder TI & Full Stack Dev", type: "normal" },
  { text: "  Santiago, Chile", type: "dim" },
  { text: "" },
  { text: '  Type "help" to see available commands.', type: "dim" },
  { text: "" },
];

const COMMANDS: Record<string, () => TerminalLine[]> = {
  help: () => [
    { text: "" },
    { text: "╔══════════════════════════════════════════════════════╗", type: "bright" },
    { text: "║  AVAILABLE COMMANDS                                  ║", type: "bright" },
    { text: "╠══════════════════════════════════════════════════════╣", type: "bright" },
    { text: "║                                                      ║", type: "bright" },
    { text: "║  about      → Who am I                              ║", type: "normal" },
    { text: "║  skills     → Technical skills                      ║", type: "normal" },
    { text: "║  experience → Work history                          ║", type: "normal" },
    { text: "║  education  → Academic background                   ║", type: "normal" },
    { text: "║  contact    → How to reach me                       ║", type: "normal" },
    { text: "║  projects   → Notable projects                      ║", type: "normal" },
    { text: "║  download   → Get my CV as PDF                      ║", type: "normal" },
    { text: "║  clear      → Clear terminal                        ║", type: "normal" },
    { text: "║  neofetch   → System info (try it!)                 ║", type: "normal" },
    { text: "║                                                      ║", type: "bright" },
    { text: "╚══════════════════════════════════════════════════════╝", type: "bright" },
    { text: "" },
  ],

  about: () => [
    { text: "" },
    { text: "┌─── ABOUT ME ─────────────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  Apasionado por la tecnología y el aprendizaje", type: "normal" },
    { text: "│  continuo. Disfruto explorando nuevas soluciones y", type: "normal" },
    { text: "│  enfrentando desafíos, buscando siempre innovar y", type: "normal" },
    { text: "│  mejorar en cada proyecto en el que participo.", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  De astrónomo a ingeniero de software — combino", type: "normal" },
    { text: "│  pensamiento analítico con desarrollo full stack.", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  🔭 Ex-astrónomo → 💻 Líder TI & Full Stack Dev", type: "normal" },
    { text: "│  📍 Santiago, Chile", type: "normal" },
    { text: "│  🗣️ Español (nativo) | English (B2)", type: "normal" },
    { text: "│", type: "bright" },
    { text: "└───────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  skills: () => [
    { text: "" },
    { text: "┌─── TECHNICAL SKILLS ───────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  ▸ BACKEND", type: "bright" },
    { text: "│    Django REST Framework, Node.js (Express)", type: "normal" },
    { text: "│    PostgreSQL, MariaDB, MongoDB, DynamoDB, Redis", type: "normal" },
    { text: "│    RESTful APIs, GraphQL", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ▸ FRONTEND", type: "bright" },
    { text: "│    React.js, Vue.js", type: "normal" },
    { text: "│    Material-UI, TailwindCSS", type: "normal" },
    { text: "│    Integración con APIs, gestión de estado", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ▸ CLOUD & DEVOPS", type: "bright" },
    { text: "│    AWS: DynamoDB, S3, Lambda, API Gateway, EC2,", type: "normal" },
    { text: "│         IAM, CloudFormation, VPC, Step Functions,", type: "normal" },
    { text: "│         CloudWatch", type: "normal" },
    { text: "│    GCP: Google APIs, integración de servicios", type: "normal" },
    { text: "│         Google Cloud", type: "normal" },
    { text: "│    Docker | Git (GitHub, Bitbucket, CodeCommit)", type: "normal" },
    { text: "│    CI/CD | Scrum / Agile", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ▸ AI & AUTOMATION", type: "bright" },
    { text: "│    Workflows con agentes IA (n8n)", type: "normal" },
    { text: "│    Agentes inteligentes con Amazon Bedrock", type: "normal" },
    { text: "│    Automatización de procesos con IA", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ▸ LEADERSHIP & MANAGEMENT", type: "bright" },
    { text: "│    Planificación y gestión de proyectos TI", type: "normal" },
    { text: "│    Liderazgo de equipos técnicos", type: "normal" },
    { text: "│    Definición de roadmaps tecnológicos", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ▸ CERTIFICATIONS", type: "bright" },
    { text: "│    AWS Cloud Practitioner ✓", type: "normal" },
    { text: "│", type: "bright" },
    { text: "└──────────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  experience: () => [
    { text: "" },
    { text: "┌─── WORK EXPERIENCE ────────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  ◆ ChileConverge                    [sep 2024 - now]", type: "bright" },
    { text: "│    Líder TI / Full Stack Developer", type: "normal" },
    { text: "│    • Liderazgo del área de tecnología", type: "dim" },
    { text: "│    • Planificación y gestión de proyectos TI", type: "dim" },
    { text: "│    • Plataforma de apoyo a MiPymes", type: "dim" },
    { text: "│    • Workflows con agentes IA (n8n, AWS)", type: "dim" },
    { text: "│    • Integración con Google APIs (GCP)", type: "dim" },
    { text: "│    • Administración de infraestructura AWS", type: "dim" },
    { text: "│", type: "bright" },
    { text: "│  ◆ CaptaHydro SpA                   [ago 2023 - ago 2024]", type: "bright" },
    { text: "│    Desarrollador Backend", type: "normal" },
    { text: "│    • Monitoreo de caudales y calidad de agua", type: "dim" },
    { text: "│    • Procesamiento de datos IoT → nube", type: "dim" },
    { text: "│", type: "bright" },
    { text: "│  ◆ Redpie Limitada                  [mar 2022 - jul 2023]", type: "bright" },
    { text: "│    Desarrollador FullStack", type: "normal" },
    { text: "│    • Software con IA para materiales docentes", type: "dim" },
    { text: "│", type: "bright" },
    { text: "│  ◆ Banco Falabella (Práctica)       [sep 2021 - mar 2023]", type: "bright" },
    { text: "│    Data Engineer", type: "normal" },
    { text: "│    • Migración Data Warehouse → GCP", type: "dim" },
    { text: "│", type: "bright" },
    { text: "└──────────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  education: () => [
    { text: "" },
    { text: "┌─── EDUCATION ─────────────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  ◆ Ingeniería Civil en Computación     [2020 - 2023]", type: "bright" },
    { text: "│    Universidad de Chile", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  ◆ Licenciatura en Ciencias            [2015 - 2019]", type: "bright" },
    { text: "│    Mención Astronomía", type: "normal" },
    { text: "│    Universidad de Chile", type: "normal" },
    { text: "│", type: "bright" },
    { text: "└────────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  contact: () => [
    { text: "" },
    { text: "┌─── CONTACT ───────────────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  ✉  estebanjramirezfuenzalida@gmail.com", type: "normal" },
    { text: "│  📱 +56 9 7784 9074", type: "normal" },
    { text: "│  📍 Santiago, Chile", type: "normal" },
    { text: "│", type: "bright" },
    { text: "│  GitHub   → github.com/DidoTau", type: "link", href: "https://github.com/DidoTau" },
    { text: "│  LinkedIn → linkedin.com/in/estebanjramirezfuenzalida", type: "link", href: "https://www.linkedin.com/in/estebanjramirezfuenzalida/" },
    { text: "│", type: "bright" },
    { text: "└────────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  projects: () => [
    { text: "" },
    { text: "┌─── NOTABLE PROJECTS ───────────────────────────────────┐", type: "bright" },
    { text: "│", type: "bright" },
    { text: "│  ▸ Plataforma MiPymes (ChileConverge)", type: "bright" },
    { text: "│    Stack: React, Django, AWS, PostgreSQL", type: "normal" },
    { text: "│    Plataforma web para apoyar micro y pequeñas", type: "dim" },
    { text: "│    empresas en Chile.", type: "dim" },
    { text: "│", type: "bright" },
    { text: "│  ▸ Monitor de Caudales (CaptaHydro)", type: "bright" },
    { text: "│    Stack: Node.js, AWS Lambda, DynamoDB, IoT", type: "normal" },
    { text: "│    Sistema de monitoreo en tiempo real de calidad", type: "dim" },
    { text: "│    de agua usando sensores IoT.", type: "dim" },
    { text: "│", type: "bright" },
    { text: "│  ▸ IA para Docentes (Redpie)", type: "bright" },
    { text: "│    Stack: Vue.js, Node.js, AI APIs", type: "normal" },
    { text: "│    Herramienta de creación de materiales", type: "dim" },
    { text: "│    educativos con inteligencia artificial.", type: "dim" },
    { text: "│", type: "bright" },
    { text: "└──────────────────────────────────────────────────────────┘", type: "bright" },
    { text: "" },
  ],

  neofetch: () => [
    { text: "" },
    { text: "        .--.          esteban@portfolio", type: "bright" },
    { text: "       |o_o |         ─────────────────────", type: "normal" },
    { text: "       |:_/ |         OS: Esteban-OS v2.0.24", type: "normal" },
    { text: "      //   \\ \\        Host: Santiago, Chile", type: "normal" },
    { text: "     (|     | )       Kernel: UChile CompSci", type: "normal" },
    { text: "    /'\\_   _/`\\       Uptime: 5+ years coding", type: "normal" },
    { text: "    \\___)=(___/       Shell: fullstack-zsh", type: "normal" },
    { text: "                      Role: IT Lead @ ChileConverge", type: "normal" },
    { text: "                      DE: React + Vue", type: "normal" },
    { text: "                      WM: TailwindCSS", type: "normal" },
    { text: "                      Cloud: AWS (Certified) + GCP", type: "normal" },
    { text: "                      CPU: Django + Node.js", type: "normal" },
    { text: "                      Memory: PostgreSQL/Mongo", type: "normal" },
    { text: "                      AI: n8n + Amazon Bedrock", type: "normal" },
    { text: "                      GPU: Docker containers", type: "normal" },
    { text: "" },
    { text: "  ████████████████████████████████████", type: "bright" },
    { text: "" },
  ],

  download: () => [
    { text: "" },
    { text: "  Downloading CV.pdf ...", type: "normal" },
    { text: "  ████████████████████████████ 100%", type: "bright" },
    { text: "" },
  ],
};

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [showCrt, setShowCrt] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    setShowCrt(true);
    let bootIndex = 0;
    const bootInterval = setInterval(() => {
      if (bootIndex < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, { text: BOOT_SEQUENCE[bootIndex], type: "dim" }]);
        bootIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setLines((prev) => [...prev, ...WELCOME_LINES]);
          setIsBooting(false);
        }, 400);
      }
    }, 150);

    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ text: `> ${cmd}`, type: "normal" }];

    if (trimmed === "clear") {
      setLines([...WELCOME_LINES]);
      setInput("");
      return;
    }

    if (trimmed === "download") {
      const output = COMMANDS.download();
      setLines((prev) => [...prev, ...newLines, ...output]);
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/CV.pdf";
        link.download = "Esteban_Ramirez_CV.pdf";
        link.click();
      }, 500);
    } else if (COMMANDS[trimmed]) {
      const output = COMMANDS[trimmed]();
      setLines((prev) => [...prev, ...newLines, ...output]);
    } else if (trimmed === "") {
      setLines((prev) => [...prev, ...newLines]);
    } else {
      setLines((prev) => [
        ...prev,
        ...newLines,
        { text: "" },
        { text: `  Command not found: ${trimmed}`, type: "dim" },
        { text: '  Type "help" for available commands.', type: "dim" },
        { text: "" },
      ]);
    }

    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (partial) {
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(partial));
        if (match) setInput(match);
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderLine = (line: TerminalLine, index: number) => {
    if (line.type === "ascii") {
      return (
        <div key={index} className="ascii-art">
          {line.text}
        </div>
      );
    }
    if (line.type === "link" && line.href) {
      return (
        <div key={index} className="terminal-line">
          <a href={line.href} target="_blank" rel="noopener noreferrer" className="link-text">
            {line.text}
          </a>
        </div>
      );
    }
    return (
      <div key={index} className={`terminal-line ${line.type || ""}`}>
        {line.text}
      </div>
    );
  };

  return (
    <div className="crt-container">
      <div className={`crt-screen ${showCrt ? "crt-on" : ""}`} onClick={handleTerminalClick}>
        <div className="header-bar">
          <div className="header-dot" />
          <div className="header-dot" />
          <div className="header-dot" />
          <span>esteban@portfolio:~$</span>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          {lines.map((line, i) => renderLine(line, i))}

          {!isBooting && (
            <div className="input-line">
              <span className="prompt-symbol">▶</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              {!input && <span className="cursor-block" />}
            </div>
          )}
        </div>

        <div className="crt-bezel" />
        <div className="crt-vignette" />
      </div>
    </div>
  );
}
