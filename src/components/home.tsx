import { useState, useEffect } from "react"
import { get_one_month_ago_repos } from '../logic/handle_api_calls'
import { Repo } from '../logic/repo'
import { RepoCard } from "./repo_card"
import { RepoCardSkleton } from "./repo_card_skleton"

const { REACT_APP_NAME, REACT_APP_NUMBER_OF_REPOS_PER_PAGE } = process.env

export const Home = () => {
    const [is_loading, set_is_loading] = useState<Boolean>(true)
    const [curr_page_index, set_curr_page_index] = useState<number>(1)
    const [repos, set_repos] = useState<Repo[]>([])
    const [is_complete_results, set_is_complete_results] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `${REACT_APP_NAME} - Home`
        get_more_repos()
    }, [])

    useEffect(() => {
        const scrolling_function = () => {
            console.log(is_loading)
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100
                && !is_loading && !is_complete_results) {
                get_more_repos()
                window.removeEventListener('scroll', scrolling_function)
            }
        }
        window.addEventListener('scroll', scrolling_function);
    }, [is_loading])

    const get_more_repos = async () => {
        try {
            set_is_loading(true)
            let api_call_results = await get_one_month_ago_repos(curr_page_index);
            console.log(api_call_results)
            if (api_call_results['incomplete_results']) {
                set_is_complete_results(true)
            }
            const new_repos: Repo[] = [];
            for (let repo of api_call_results['items']) {
                let is_exist: boolean = false
                for (let old_repo of repos) {
                    if (old_repo.id === repo['id']) {
                        is_exist = true
                    }
                }
                if (!is_exist) {
                    console.log(repo)
                    new_repos.push(new Repo(repo['id'], repo['name'],
                        repo['description'], repo['watchers'], repo['open_issues_count'],
                        repo['created_at'], repo['owner']['avatar_url'], repo['owner']['login']
                    ))
                }
            }
            set_repos([...repos, ...new_repos])
            set_curr_page_index(curr_page_index + 1)
            set_is_loading(false)
        } catch (_) {
            get_more_repos()
        }
    }

    return <div style={{ margin: "5px" }}>
        {(repos.length !== 0) ? repos.map((repo, i) => <RepoCard repo={repo} key={repo.id} />)
            : <></>}
        {(is_loading) ? Array.from({ length: Number(REACT_APP_NUMBER_OF_REPOS_PER_PAGE) },
            (_, i) => 0).map((_, i) => <RepoCardSkleton />)
            : <></>}
    </div >
}

