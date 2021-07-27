export interface repo_schema {
    id: number,
    name: String,
    description: string,
    nb_stars: number,
    nb_issues: number,
    created_at: String,
    owner_name: String,
    owner_avatar_url: String,
}

export class Repo implements repo_schema {
    id: number;
    name: String;
    description: string;
    nb_stars: number;
    nb_issues: number;
    created_at: String;
    owner_avatar_url: String;
    owner_name: String;
    constructor(id: number, name: string, description: string,
        nb_stars: number, nb_issues: number, created_at: String, owner_avatar_url: String,
        owner_name: String) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.nb_stars = nb_stars;
        this.nb_issues = nb_issues;
        this.created_at = created_at;
        this.owner_avatar_url = owner_avatar_url;
        this.owner_name = owner_name;
    }
}