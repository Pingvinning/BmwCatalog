// API Configuration
const API_BASE_URL = 'http://localhost:8080/bmw/models';

// DOM Elements
const modelListContainer = document.querySelector('.model-list');
const modelDetailContainer = document.getElementById('model-detail');
const modelTabs = document.querySelectorAll('.model-tab');

// Load models for selected tab
async function loadModels(modelName) {
  try {
    // Show loading state
    modelListContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Загрузка моделей ${modelName}...</p>
      </div>
    `;

    // Fetch models from API
    const response = await fetch(`${API_BASE_URL}/${modelName}`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const models = await response.json();

    // Render models
    modelListContainer.innerHTML = models.map(model => `
      <div class="model-card" data-id="${model.id}">
        <div class="model-card__img" style="background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), #1c69d4; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 2rem; font-weight: bold;">${model.name} ${model.generation}</span>
        </div>
        <div class="model-card__info">
          <h4 class="model-card__name">${model.name} ${model.generation}</h4>
          <span class="model-card__year">${model.yearStart} год</span>
          <p style="margin-top: 10px; color: #666;">Нажмите для подробной информации</p>
        </div>
      </div>
    `).join('');

    // Add click event listeners to model cards
    document.querySelectorAll('.model-card').forEach(card => {
      card.addEventListener('click', () => {
        const modelId = card.getAttribute('data-id');
        loadModelDetails(modelId);
      });
    });

  } catch (error) {
    console.error('Ошибка:', error);
    modelListContainer.innerHTML = `
      <div class="error-message">
        <p>Не удалось загрузить модели. Пожалуйста, попробуйте позже.</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Load model details by ID
async function loadModelDetails(modelId) {
  try {
    // Show loading state
    modelDetailContainer.innerHTML = `
      <div class="loading">
        <div class="loading-spinner"></div>
        <p>Загрузка деталей модели...</p>
      </div>
    `;
    modelDetailContainer.style.display = 'block';

    // Scroll to details
    modelDetailContainer.scrollIntoView({ behavior: 'smooth' });

    // Fetch model details from API
    const response = await fetch(`${API_BASE_URL}/id/${modelId}`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const model = await response.json();

    // Render model details
    modelDetailContainer.innerHTML = `
      <div class="model-detail__header">
        <div class="model-detail__image">
          <div style="background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), #1c69d4; height: 300px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 2.5rem; font-weight: bold;">${model.name} ${model.generation}</span>
          </div>
        </div>
        <div class="model-detail__info">
          <h2 class="model-detail__name">${model.name}</h2>
          <span class="model-detail__generation">${model.generation}</span>
          <p class="model-detail__description">${model.description}</p>
          <div class="model-detail__spec">
            <p><strong>Год выпуска:</strong> ${model.yearStart}</p>
            <p><strong>Тип кузова:</strong> ${model.bodyType}</p>
          </div>
        </div>
      </div>
      
      <div class="specs-grid">
        <div class="spec-card">
          <div class="spec-card__value">${model.engine}</div>
          <div class="spec-card__label">Двигатель</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.powerHp} л.с.</div>
          <div class="spec-card__label">Мощность</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.transmission}</div>
          <div class="spec-card__label">Трансмиссия</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.drive}</div>
          <div class="spec-card__label">Привод</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.acceleration} сек</div>
          <div class="spec-card__label">0-100 км/ч</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.maxSpeed} км/ч</div>
          <div class="spec-card__label">Макс. скорость</div>
        </div>
        <div class="spec-card">
          <div class="spec-card__value">${model.fuelConsumption} л/100км</div>
          <div class="spec-card__label">Расход топлива</div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding: 0 30px;">
        <button id="back-to-catalog" class="btn" style="background: #1c69d4; color: white; border-color: #1c69d4;">
          Вернуться к каталогу
        </button>
      </div>
    `;

    // Add event listener to back button
    document.getElementById('back-to-catalog').addEventListener('click', () => {
      modelDetailContainer.style.display = 'none';
    });

  } catch (error) {
    console.error('Ошибка:', error);
    modelDetailContainer.innerHTML = `
      <div class="error-message">
        <p>Не удалось загрузить детали модели. Пожалуйста, попробуйте позже.</p>
        <p>${error.message}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <button id="back-to-catalog" class="btn">Вернуться к каталогу</button>
      </div>
    `;
    document.getElementById('back-to-catalog').addEventListener('click', () => {
      modelDetailContainer.style.display = 'none';
    });
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Tab click handlers
  modelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const modelName = tab.getAttribute('data-model');
      loadModels(modelName);
    });
  });

  // Load initial models (M2)
  loadModels('M2');
});
