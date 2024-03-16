var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var credentials = JSON.parse(xhr.responseText);
      document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

      
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        
        if (username === credentials.username && password === credentials.password) {
          this.reset();
          window.location.href = 'indexT.html';
        
        } 

        // site info 
        else if(username === credentials.info && password === credentials.info_pass){
          
          this.reset();
          window.location.href = 'info/info.html';

        }

        else {
          
          alert('Incorrect username or password.');
          this.reset();
        }
      });
    } else {
      
      console.error('File download failed');
    }
  }
};
xhr.open('GET', 'config.json', true);
xhr.send();


