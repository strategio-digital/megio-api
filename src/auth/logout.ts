const logout = (): void => {
    localStorage.removeItem('strategio_saas_user')
}

export default logout