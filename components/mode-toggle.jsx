// "use client";
// import { Moon, Sun } from "lucide-react"
// import { Button } from "./ui/button";

// export function ModeToggle() {
//   return (
//     <Button variant="ghost" size="icon" className="h-9 w-9">
//       <Sun className="h-[1.2rem] w-[1.2rem]" />
//     </Button>
//   )
// }

// "use client";

// import { Moon, Sun } from "lucide-react"
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Avoid hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <Button variant="ghost" size="icon" className="h-9 w-9">
//         <Sun className="h-[1.2rem] w-[1.2rem]" />
//       </Button>
//     );
//   }

//   return (
//     <Button 
//       variant="ghost" 
//       size="icon" 
//       className="h-9 w-9"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//     >
//       {theme === "dark" ? (
//         <Sun className="h-[1.2rem] w-[1.2rem]" />
//       ) : (
//         <Moon className="h-[1.2rem] w-[1.2rem]" />
//       )}
//     </Button>
//   );
// }


"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-9 w-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}