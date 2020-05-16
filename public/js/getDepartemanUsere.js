function getDepartemanUsere()
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            const response = JSON.parse(this.responseText).body;
            document.write(response);
            console.log(JSON.parse(response).d.results);
        }
    }

    xhr.open('GET', '/JSONreport?domain=[myDomain]&user=[username]&pass=[password]', true);
    xhr.send();
}

getDepartemanUsere();