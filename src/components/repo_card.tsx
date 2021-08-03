import { FC } from 'react'
import { Repo } from '../logic/repo'
import star_image from '../images/star.svg'
import warning_image from '../images/warning-sign.svg'
import calendar_image from '../images/calendar.svg'

const { REACT_APP_GITHUB_URL } = process.env

interface RepoCardSchema {
    repo: Repo
}

export const RepoCard: FC<RepoCardSchema> = (props: RepoCardSchema) => {
    const repo = props.repo;

    const format_number = (target: number) => {
        const fixed_target = 1
        if (target >= 1000000) {
            return `${(target / 1000000).toFixed(fixed_target)}M`
        }
        if (target >= 1000) {
            return `${(target / 1000).toFixed(fixed_target)}K`
        }
        return target
    }

    const format_string = (target: string, max_length: number) => {
        if (target.length > max_length) {
            target = `${target.substring(0, max_length).trim()}....`
        }
        return target.trim()
    }

    const redirect_to_repositry = () => {
        window.open(`${REACT_APP_GITHUB_URL}/${repo.owner_name}/${repo.name}`, "_blank")
    }

    const redirect_to_repositry_owner = () => {
        window.open(`${REACT_APP_GITHUB_URL}/${repo.owner_name}`, "_blank")
    }


    const get_day_of_creation = () => {
        const now_date = new Date()
        const creation_date = new Date(repo.created_at as string)
        const diff_in_time = now_date.getTime() - creation_date.getTime()
        const days = (diff_in_time / (1000 * 3600 * 24)).toFixed(0)
        return days
    }

    return <div className="repo_card">
        <img src={repo.owner_avatar_url as string} className="repo_card_user_avatar"
            onClick={redirect_to_repositry_owner} />
        <div className="repo_card_details">
            <p className="repo_card_title"
                onClick={redirect_to_repositry}>
                {format_string(repo.name as string, 100)}
            </p>
            <p className="repo_card_description">
                {repo.description !== null ? format_string(repo.description, 120)
                    : "No Description"}
            </p>
            <br />
            <div className="repo_card_counter_container">
                <CounterCard image_src={star_image}>
                    <p>&nbsp;{format_number(repo.nb_stars)}</p>
                </CounterCard>
                <CounterCard image_src={warning_image}>
                    <p>&nbsp;{format_number(repo.nb_issues)}</p>
                </CounterCard>
                <span className="repo_card_small_screen_date_container">
                    <CounterCard image_src={calendar_image}>
                        <p>&nbsp;{`${get_day_of_creation()} days`}</p>
                    </CounterCard>
                </span>
                <p className="repo_card_medium_screen_date_container">
                    &nbsp;{`Submitted ${get_day_of_creation()} days ago by `}
                    <span style={{
                        color: "var(--SECONDARY_COLOR_2)", fontSize: "inherit",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                        onClick={redirect_to_repositry_owner}>
                        {repo.owner_name}
                    </span>
                </p>
            </div>
        </div>
    </div>
}

interface CounterCardSchema {
    image_src: String,
    children: any
}

const CounterCard: FC<CounterCardSchema> = (props: CounterCardSchema) => {
    const { image_src, children } = props

    return <div className="repo_card_counter">
        <img src={image_src as string} width="15px" />
        {children}
    </div>
}

