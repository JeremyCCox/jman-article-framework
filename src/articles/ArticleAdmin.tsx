'use client'
import {useMutation, useQuery, useQueryClient} from "react-query";
import {ArticleType, getArticle, getArticles, updateArticle} from "./lib/ArticleServices";
// import Loading from "@/components/layout/Loading";
// import TextInput from "@/components/inputs/TextInput";
// import MyTiptap from "@/components/inputs/MyTiptap";
import React, {ReactNode} from "react";
import EditArticle from "../articles/EditArticle";
import {useRouter} from "next/navigation";

export default function ArticleAdmin({articleId,Loading}:{articleId:string,Loading:ReactNode}){
    const queryClient = useQueryClient();
    const editArticle = async (data:ArticleType)=>{
        await updateArticle(data)
    }
    const router = useRouter()
    const articleData = useQuery(["article",articleId],async () => {
        let article = JSON.parse(await getArticle(articleId));
        if(article.error){
            if(article.error === "Article not found!"){
                router.push('/admin/articles')
            }
            throw new Error(article.error.message)
        }
        return article
    })
    const mutation = useMutation(
        {
            mutationFn:editArticle,
            onMutate: async (article) => {
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                // await queryClient.cancelQueries({ queryKey: ['article', articleId] })

                // Snapshot the previous value
                const previousArticle = queryClient.getQueryData(['article', articleId])

                // Optimistically update to the new value
                queryClient.setQueryData(['article', articleId], article)

                // Return a context with the previous and new todo
                return { previousArticle, article }
            },
            onSuccess:()=>{
                // queryClient.refetchQueries({
                //     queryKey:['article', articleId]
                // })
            }
        })
    return(
        <div className={"text-amber-100"}>
            {articleData.isLoading?
                <Loading/>
                :
                articleData.isError?
                    <>Something went wrong!</>
                    :
                    <>
                        <EditArticle article={articleData.data} mutate={mutation}/>
                        {/*<pre className={'text-wrap'}>*/}
                        {/*    {JSON.stringify(mutation,null,2)}*/}
                        {/*</pre>*/}

                    </>
            }
        </div>
    )
}