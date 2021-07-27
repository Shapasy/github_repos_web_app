import axios from "axios";
import moment from "moment";

const { REACT_APP_API_URL, REACT_APP_NUMBER_OF_REPOS_PER_PAGE } = process.env

const get_date_one_month_age = () => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return moment(date).format('YYYY-MM-DD')
}

export async function get_one_month_ago_repos(page_index: number) {
    let date_one_month_age: string = get_date_one_month_age()
    const url = `${REACT_APP_API_URL}/search/repositories?q=created:>${date_one_month_age}&page=${page_index}
        &per_page=${REACT_APP_NUMBER_OF_REPOS_PER_PAGE}&sort=stars&order=desc`
    const result = await axios.get(url);
    return result.data;
}