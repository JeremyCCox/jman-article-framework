'use client'
import {useQuery, useQueryClient, UseQueryResult} from "react-query";
import {ArticleType, getArticleTitles, removeArticle} from "./lib/ArticleServices";
import Article from "../articles/Article";
import AdminArticleLink from "../articles/AdminArticleLink";
import {useRouter} from "next/navigation";
import {ReactNode} from "react"

export default function AdminArticleList({Loading}:Readonly<{ Loading: ReactNode }>){
    const router = useRouter()
    const queryClient = useQueryClient()
    const articleTitles:UseQueryResult<[ArticleType]> = useQuery('articleTitles',async () => {
        let titles = JSON.parse(await getArticleTitles());
        if(titles.error){
            throw new Error(titles.error.message)
        }
        return titles.data
    })
    const goToNew=()=>{
        router.push('/admin/articles/new')
    }
    const deleteArticle=async (articleId: string) => {
        await removeArticle(articleId)
        await queryClient.refetchQueries("articleTitles")

    }

    return(
        <div className={'mt-16 grid justify-evenly'}>
           <Article title={'Jcox.ca Admin'}>
               <div className={'px-16 my-8 select-none'}>
                   <button className={'border rounded w-full h-20 hover:shadow-inner hover:shadow-amber-100  transition-all duration-700'} type={"button"} onClick={goToNew}>
                        New Article
                   </button>
               </div>
               {articleTitles.isLoading?
                   <Loading/>
                   :
                   articleTitles.isError?
                   <p>Error!</p>
                   :
                       articleTitles.data?
                           <div className={'grid '}>
                               {articleTitles.data.map(article=>{
                                   return(
                                        <AdminArticleLink key={article._id} article={article} deleteArticle={deleteArticle} />
                                   )
                               }
                               )}
                           </div>
                           :
                           <QueryError/>

               }
           </Article>
        </div>
    )
}