let lastScrollTop = 0;
const plaska = document.getElementById('plaska');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        plaska.classList.add('plaska-hidden');
    } else {
        plaska.classList.remove('plaska-hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки');
            return response.json();
        })
        .then(data => {
            const tariffs = data.tariffs;
            fillTariffBlock('default', tariffs[0]);
            fillTariffBlock('booth', tariffs[1]);
            fillTariffBlock('VIP', tariffs[2]);

            fillTariffSelect(tariffs);
        })
        .catch(error => {
            console.error('ошибка:', error);
        });
});

function fillTariffBlock(blockId, tariff) {
    const block = document.getElementById(blockId);
    if (!block || !tariff) return;

    block.querySelector('.t-name').textContent = `Тариф "${tariff.name}"`;
    block.querySelector('.tariff-description').textContent = tariff.description;
    block.querySelector('.price-val').textContent = tariff.price;
    block.querySelector('.price-detail').textContent = tariff.price_detail;

    const btn = block.querySelector('.buy-button');
    btn.dataset.tariff = tariff.name;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tariffName = this.dataset.tariff;
        const select = document.getElementById('tariffSelect');
        for (let option of select.options) {
            if (option.textContent.includes(tariffName) || option.value === tariffName) {
                option.selected = true;
                break;
            }
        }
        document.getElementById('confirm-buy').scrollIntoView({ behavior: 'smooth' });
    });
}

function fillTariffSelect(tariffs) {
    const select = document.getElementById('tariffSelect');
    select.innerHTML = '';
    tariffs.forEach(tariff => {
        const option = document.createElement('option');
        option.value = tariff.name;
        option.textContent = `${tariff.name} — ${tariff.price} ${tariff.price_detail}`;
        select.appendChild(option);
    });
}

document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert(`Заявка отправлена! Скоро наши специалисты свяжутся с вами!`);
});
