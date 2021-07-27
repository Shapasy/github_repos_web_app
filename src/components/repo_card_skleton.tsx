import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export const RepoCardSkleton = () => {
    return <SkeletonTheme color="var(--SECONDARY_COLOR_1)" highlightColor="#444">
        <Skeleton className="repo_card" style={{ margin: "5px 0px", boxShadow: "none" }} />
    </SkeletonTheme>
}