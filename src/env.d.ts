


interface AuthObj {user: User | null}

interface Listener {
  (auth: AuthObj): void
}

// const api: import("./api/AbsFetch").AbsFetch