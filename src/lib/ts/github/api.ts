export async function ghApiPost(
    token: string,
    path: string,
    data: object
): Promise<{ ok: boolean; data: object }> {
    const res = await fetch(`https://api.github.com${path}`, {
        method: "post",
        headers: { Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" },
        body: JSON.stringify(data)
    });
    return { data: await res.json(), ok: res.ok };
}

export async function ghApiPut(
    token: string,
    path: string,
    data: object
): Promise<{ ok: boolean; data: object }> {
    const res = await fetch(`https://api.github.com${path}`, {
        method: "put",
        headers: { Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" },
        body: JSON.stringify(data)
    });
    return { data: await res.json(), ok: res.ok };
}

export async function ghApiGet(
    token: string,
    path: string
): Promise<{ ok: boolean; data: object }> {
    const res = await fetch(`https://api.github.com${path}`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" }
    });
    return { data: await res.json(), ok: res.ok };
}
