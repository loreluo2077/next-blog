"use client"

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useState} from "react";
import { DrawerClose } from "./ui/drawer";

const Toc = ({toc, DrawerCloseComponent}: {toc: any, DrawerCloseComponent?: typeof DrawerClose}) => {
    const ml: any = {
        2: '',
        3: 'ml-4',
        4: 'ml-8',
        5: 'ml-12',
        6: 'ml-16',
    }
    const [current, setCurrent] = useState<string>("")

    const handleClick = (href: string) => {
        setCurrent(href)
        const id = href.replace('#', '')
        setTimeout(() => {
            const element: any = document.getElementById(id)
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            })
        }, 100)
    }
    return (
        <div className={'flex flex-col w-full space-y-1'}>
            {toc.length > 0 ?
                toc.map((item: any, index: number) => {
                    const ButtonComponent = (
                        <Button
                            onClick={() => {
                                handleClick(item.href)
                            }}
                            key={index}
                            size={'sm'}
                            variant={current == item?.href ? "secondary" : "ghost"}
                            className={cn(ml[item.depth], 'text-sm justify-start')}
                        >
                            {item.value}
                        </Button>
                    )
                    return DrawerCloseComponent ? (
                        <DrawerCloseComponent asChild key={index}>
                            {ButtonComponent}
                        </DrawerCloseComponent>
                    ) : ButtonComponent
                })
                :
                <div className={'text-sm text-gray-500 p-4'}>
                    No table of contents.
                </div>
            }
        </div>
    )
}

export default Toc;