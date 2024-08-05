"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

export function ConvertForm() {
  const [input, setInput] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [sep, setSep] = useState<string>("'")
  const [rows, setRows] = useState<number>(3)
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyOutput = () => {
    copyToClipboard(output)
    setHasCopied(true)
  }

  useEffect(() => {
    const convertLinesToList = (input: string): string => {
      if (input === '') return ""
      const lines = input.split("\n")
      return lines.map((line) => ''.concat(sep, line, sep)).join(", ")
    }

    const setDisplayRows = (input: string) => {
      const lines = input.split("\n")
      return lines.length < 3 ? 3 : Math.min(lines.length + 1, 8)
    }

    setRows(setDisplayRows(input))
    setOutput(convertLinesToList(input))
  }, [input, sep])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert lines of strings to a list</CardTitle>
        <CardDescription>
          {`It's useful if you're working with data from spreadsheets and need to convert to a list to be used in a query.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Input:</h4>
          <Textarea
            className={"resize-y"}
            placeholder="Paste your lines here"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={rows}
            spellCheck={false}
            autoCorrect="off"
          />
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Output:</h4>
          <Textarea
            placeholder="Your output will show here"
            value={output}
            spellCheck={false}
            autoCorrect="off"
            readOnly
          />
          <Button
            variant="secondary"
            className="shrink-0 inline-flex items-center space-x-1"
            onClick={copyOutput}
            disabled={hasCopied}
          >
            <span>Copy</span>
            {hasCopied ? <CheckIcon className="size-4" /> : <ClipboardIcon className="size-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}