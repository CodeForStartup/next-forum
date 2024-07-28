"use client"

import React from "react"

import { createPlateEditor, createPlugins, Plate } from "@udecode/plate-common"
import { serializeHtml } from "@udecode/plate-serializer-html"
import htmlReactParser, { attributesToProps, domToReact } from "html-react-parser"
import slugify from "slugify"

import { components, platePlugins } from "@/molecules/editor"
import { TPostItem } from "@/types/posts"

interface PostContentProps {
  post: TPostItem
}

const extractDataFromDomNode = (domNode) => {
  if (domNode.type === "text") {
    return domNode.data
  }

  return domNode.children
    .map((childNode) => {
      return extractDataFromDomNode(childNode)
    })
    .join("")
}

const HTMLParser: React.FC<PostContentProps> = ({ post }) => {
  const editor = createPlateEditor({
    plugins: platePlugins,
  })

  const html = serializeHtml(editor, {
    nodes: post.content ? JSON.parse(post.content) : [],
  })

  console.log(">>>>html", html)

  const options = {
    replace: (domNode) => {
      if (domNode.name === "h1") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h1
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h1>
        )
      }
      if (domNode.name === "h2") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h2
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h2>
        )
      }
      if (domNode.name === "h3") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h3
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h3>
        )
      }
      if (domNode.name === "h4") {
        const props = attributesToProps(domNode.attribs)
        return (
          <h4
            {...props}
            id={slugify(extractDataFromDomNode(domNode))}
          >
            {domToReact(domNode.children, options)}
          </h4>
        )
      }
    },
  }

  return <div className="post-content mt-8">{htmlReactParser(html, options)}</div>
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <Plate plugins={platePlugins}>
      <HTMLParser post={post} />
    </Plate>
  )
}

export default PostContent
