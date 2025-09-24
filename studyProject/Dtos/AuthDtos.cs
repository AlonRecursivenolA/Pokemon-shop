namespace studyProject.Dtos
{
    public class LoginAuthDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class RegisterAuthDto
    {
        public string Password { get; set; }
        public string userName { get; set; }

    }

    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string UserName { get; set; }
    }
}
