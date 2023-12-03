const expiredTokenHandler = (err, navigate, dispatch) => {
	if (err === `Invalid or expired token`) navigate(`/`);
};
