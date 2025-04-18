import {Languages,} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function LangueSwitch() {
 

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="none" size="icon">
            <Languages className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log('EN')}>
            EN
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('ZH')}>
            ZH
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  