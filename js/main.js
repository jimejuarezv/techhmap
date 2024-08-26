function showComponents(filter) {
    let buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = '';

    let components = [];

    if (filter === 'ranuras') {
        components = [
            { title: 'Ranura PCI', x: 120, y: 180, definition: 'Ranura PCI: Se utiliza para conectar tarjetas de expansión.' }
        ];
    } else if (filter === 'puertos') {
        components = [
            { title: 'Puerto USB', x: 200, y: 50, definition: 'Puerto USB: Conecta dispositivos periféricos.' }
        ];
    } else if (filter === 'alimentacion') {
        components = [
            { title: 'Conector de Alimentación', x: 300, y: 120, definition: 'Conector de Alimentación: Suministra energía a la placa.' }
        ];
    } else if (filter === 'disipadores') {
        components = [
            { title: 'Disipador', x: 400, y: 150, definition: 'Disipador: Enfría los componentes para evitar sobrecalentamiento.' }
        ];
    } else if (filter === 'chips') {
        components = [
            { title: 'Chipset', x: 350, y: 200, definition: 'Chipset: Controla la comunicación entre los componentes.' }
        ];
    }

    for (let i = 0; i < components.length; i++) {
        let button = document.createElement('button');
        button.className = 'component-button';
        button.style.left = components[i].x + 'px';
        button.style.top = components[i].y + 'px';
        button.textContent = components[i].title;
        button.onclick = function() {
            showDefinition(components[i].title, components[i].definition);
        };
        buttonContainer.appendChild(button);
    }
}

function showDefinition(title, text) {
    let definition = document.getElementById('definition');
    let definitionTitle = document.getElementById('definition-title');
    let definitionText = document.getElementById('definition-text');
    let downloadButton = document.getElementById('download-button');

    definitionTitle.textContent = title;
    definitionText.textContent = text;
    downloadButton.classList.remove('hidden');
    definition.classList.remove('hidden');

    downloadButton.onclick = function() {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 200;

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = '20px Arial';
        context.fillStyle = 'black';
        context.fillText(definitionTitle.textContent, 10, 30);
        context.fillText(definitionText.textContent, 10, 60);

        let link = document.createElement('a');
        link.download = 'definition.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    function handleClickOutside(event) {
        if (!definition.contains(event.target)) {
            definition.classList.add('hidden');
            document.removeEventListener('click', handleClickOutside);
        }
    }

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 0);
}
