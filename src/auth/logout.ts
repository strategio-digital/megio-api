const logout = (): void => {
    localStorage.removeItem('megio_user')
}

export default logout