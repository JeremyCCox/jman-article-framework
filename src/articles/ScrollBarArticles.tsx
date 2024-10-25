'use client'
import Article from "./Article";
import {useQuery, UseQueryResult} from "react-query";
import {ArticleType, getArticles} from "./lib/ArticleServices";
import React from "react";
export default function ScrollBarArticles(){
    const articleQuery:UseQueryResult<[ArticleType]> = useQuery('articles',async () => {
       let articles = JSON.parse(await getArticles());
       if(articles.error){
           throw new Error(articles.error.message)
       }
        return orderByUpdate(articles.data)
    });

    const orderByUpdate=(list :ArticleType[])=>{
        return list.sort((a,b)=>{
            if(!a.lastUpdate && !b.lastUpdate){
                return 0
            }
            if(!a.lastUpdate){
                return 1
            }
            if(!b.lastUpdate){
                return -1
            }
            let aDate = new Date(a.lastUpdate)
            let bDate = new Date(b.lastUpdate)
            if(aDate > bDate){
                return -1
            }
            if(aDate < bDate){
                return 1
            }
            return 0
        })
    }

    return(
        <>
            <Article isHome={true}  imgSrc={'/JeremySmiling.jpg'} imgAlt={"Jeremy Cox"}>
                <div className={'grid min-h-[40vh] text-amber-100'}>
                    <h3 className={'text-center'}>
                        Jeremy Cox
                    </h3>
                    {/*<ArticleLink id={'link:1'} underline={true} value={"About Me"}/>*/}
                    <p className={' text-left font-normal m-4'}>
                        I am a passionate DIY - everything developer, with experience designing, migrating and implementing software solutions for businesses, individuals and organizations.
                    </p>

                    <p className={' text-left font-normal m-4'}>
                        This website is the amalgamation of many the projects, packages & concepts I have developed in the past few years. It is ever-changing and eternally under-construction. If you notice any inconsistencies or have and suggestions, please feel free to reach out to me! I can be reached through any of the links/services listed above!

                    </p>
                    {
                        articleQuery.data&&articleQuery.data.length > 0 &&
                        <h3>
                            My Projects
                        </h3>
                    }
                    <ul>
                        {articleQuery.isLoading?
                            <li>Loading Articles</li>
                            :
                            articleQuery.isError?
                                <li>Error Loading Articles!</li>
                                :
                                articleQuery.data?
                                    (articleQuery.data).map(article=>{
                                        return (
                                            <li key={article._id}>
                                                <a href={`article/${article._id}`}>{article.title||article._id}</a>
                                            </li>
                                        )
                                    })
                                    :
                                    <></>
                        }
                    </ul>
                </div>
            </Article>

            {/*
                Disabled while Articles are their own Standalone Pages
            */}
            {/*{articleQuery.isLoading?*/}
            {/*    <Article>*/}
            {/*        <Loading/>*/}
            {/*    </Article>*/}
            {/*    :*/}
            {/*    articleQuery.isError?*/}
            {/*        <Article>*/}
            {/*            <QueryError>Something went wrong</QueryError>*/}
            {/*        </Article>*/}
            {/*        :*/}
            {/*        articleQuery.data?*/}
            {/*            (articleQuery.data).map(article=>{*/}
            {/*                return (*/}
            {/*                    <Article key={article._id} title={article.title} article={article}/>*/}
            {/*                )*/}
            {/*            })*/}
            {/*            :*/}
            {/*            <></>*/}
            {/*}*/}
        </>
    )
}