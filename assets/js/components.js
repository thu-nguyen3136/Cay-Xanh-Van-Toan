// ========================================
// Reusable Components - JavaScript
// ========================================

/**
 * FAQ Accordion Component
 */
export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Breadcrumb Generator
 */
export function generateBreadcrumb() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part);
    
    let breadcrumbHTML = '<nav class="breadcrumb"><a href="/">Trang chủ</a>';
    let currentPath = '';
    
    parts.forEach((part, index) => {
        currentPath += '/' + part;
        const isLast = index === parts.length - 1;
        const label = part.replace(/-/g, ' ').replace(/\.html$/, '');
        const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
        
        if (isLast) {
            breadcrumbHTML += `<span class="separator">/</span><span class="active">${formattedLabel}</span>`;
        } else {
            breadcrumbHTML += `<span class="separator">/</span><a href="${currentPath}">${formattedLabel}</a>`;
        }
    });
    
    breadcrumbHTML += '</nav>';
    return breadcrumbHTML;
}

/**
 * Service Card Generator
 */
export function createServiceCard(data) {
    const {
        title,
        description,
        image,
        features = [],
        badge = '',
        phoneLink = 'tel:0977786363',
        detailLink = '#'
    } = data;
    
    const badgeHTML = badge ? `<div class="service-badge">${badge}</div>` : '';
    const featuresHTML = features.map(feature => `<li>${feature}</li>`).join('');
    
    return `
        <div class="service-card-v2">
            <div class="service-image">
                <img src="${image}" alt="${title}" loading="lazy">
                ${badgeHTML}
            </div>
            <div class="service-content">
                <h3>${title}</h3>
                <p>${description}</p>
                ${features.length > 0 ? `<ul class="service-features">${featuresHTML}</ul>` : ''}
                <div class="service-cta">
                    <a href="${phoneLink}" class="btn-phone">
                        <i class="fas fa-phone-alt"></i> Gọi ngay
                    </a>
                    <a href="${detailLink}" class="btn-detail">
                        Chi tiết <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Price Table Generator
 */
export function createPriceTable(data) {
    const { headers, rows, note } = data;
    
    const headersHTML = headers.map(h => `<th>${h}</th>`).join('');
    const rowsHTML = rows.map(row => `
        <tr>
            ${row.map(cell => `<td>${cell}</td>`).join('')}
        </tr>
    `).join('');
    
    return `
        <div class="price-table">
            <table>
                <thead>
                    <tr>${headersHTML}</tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
            ${note ? `<p class="note">${note}</p>` : ''}
        </div>
    `;
}

/**
 * Alert/Notification Component
 */
export function showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(alertDiv);
    
    if (duration > 0) {
        setTimeout(() => {
            alertDiv.remove();
        }, duration);
    }
    
    return alertDiv;
}

function getAlertIcon(type) {
    const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        danger: 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

/**
 * Loading Spinner
 */
export function showLoading(container) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loading-spinner';
    
    if (container) {
        container.appendChild(spinner);
    } else {
        document.body.appendChild(spinner);
    }
    
    return spinner;
}

export function hideLoading() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

/**
 * Modal Component
 */
export function createModal(content, options = {}) {
    const {
        title = '',
        size = 'medium',
        showClose = true,
        onClose = null
    } = options;
    
    const modal = document.createElement('div');
    modal.className = `modal modal-${size}`;
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            ${title ? `<div class="modal-header">
                <h3>${title}</h3>
                ${showClose ? '<button class="modal-close"><i class="fas fa-times"></i></button>' : ''}
            </div>` : ''}
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close handlers
    const closeModal = () => {
        modal.remove();
        if (onClose) onClose();
    };
    
    if (showClose) {
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
    }
    
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    
    return modal;
}

/**
 * Tabs Component
 */
export function initTabs(tabsContainer) {
    const tabs = tabsContainer.querySelectorAll('.tab-button');
    const panels = tabsContainer.querySelectorAll('.tab-panel');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked
            tab.classList.add('active');
            panels[index].classList.add('active');
        });
    });
}

/**
 * Image Gallery/Lightbox
 */
export function initGallery(selector = '.gallery-image') {
    const images = document.querySelectorAll(selector);
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-backdrop"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            const close = () => lightbox.remove();
            lightbox.querySelector('.lightbox-close').addEventListener('click', close);
            lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
        });
    });
}

/**
 * Form Validation
 */
export function validateForm(form) {
    const errors = [];
    const fields = form.querySelectorAll('[required]');
    
    fields.forEach(field => {
        if (!field.value.trim()) {
            errors.push({
                field: field.name,
                message: `${field.placeholder || field.name} là bắt buộc`
            });
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        // Validate email
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errors.push({
                    field: field.name,
                    message: 'Email không hợp lệ'
                });
                field.classList.add('error');
            }
        }
        
        // Validate phone
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
            const cleaned = field.value.replace(/\D/g, '');
            if (!phoneRegex.test(cleaned)) {
                errors.push({
                    field: field.name,
                    message: 'Số điện thoại không hợp lệ'
                });
                field.classList.add('error');
            }
        }
    });
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Tooltip
 */
export function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.dataset.tooltip;
        
        el.addEventListener('mouseenter', () => {
            document.body.appendChild(tooltip);
            const rect = el.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
}
