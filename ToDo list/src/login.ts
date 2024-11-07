interface Credentials {
  username: string;
  password: string;
  info: string;
  info_pass: string;
}

function fetchCredentials(): Promise<Credentials> {
  return fetch('config.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('File download failed');
      }
      return response.json();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCredentials()
    .then(credentials => {
      const form = document.getElementById('login-form') as HTMLFormElement;
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (username === credentials.username && password === credentials.password) {
          form.reset();
          window.location.href = 'indexT.html';
        } else if (username === credentials.info && password === credentials.info_pass) {
          form.reset();
          window.location.href = 'info/info.html';
        } else {
          alert('Incorrect username or password.');
          form.reset();
        }
      });
    })
    .catch(error => {
      console.error(error.message);
    });
});
