document.addEventListener("DOMContentLoaded", () => {
  // === NAVEGAÇÃO MOBILE ===
  initMobileNavigation()

  // === FORMULÁRIO DE CONTATO ===
  initContactForm()

  // === ANIMAÇÕES DE SCROLL ===
  initScrollAnimations()

  // === NAVEGAÇÃO ATIVA ===
  initActiveNavigation()
})

/**
 * Inicializa a navegação mobile
 */
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    document.addEventListener("click", (event) => {
      const isClickInsideNav = navMenu.contains(event.target)
      const isClickOnHamburger = hamburger.contains(event.target)

      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }
}

/**
 * Inicializa o formulário de contato com validação
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("form-message")

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      if (validateForm()) {
        simulateFormSubmission()
      }
    })

    const requiredFields = contactForm.querySelectorAll("[required]")
    requiredFields.forEach((field) => {
      field.addEventListener("blur", () => {
        validateField(field)
      })

      field.addEventListener("input", () => {
        clearFieldError(field)
      })
    })
  }

  /**
   * Valida todos os campos do formulário
   */
  function validateForm() {
    let isValid = true
    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const mensagem = document.getElementById("mensagem")

    // Validação do nome
    if (!nome.value.trim()) {
      showFieldError(nome, "Nome é obrigatório")
      isValid = false
    } else if (nome.value.trim().length < 2) {
      showFieldError(nome, "Nome deve ter pelo menos 2 caracteres")
      isValid = false
    }

    // Validação do email
    if (!email.value.trim()) {
      showFieldError(email, "Email é obrigatório")
      isValid = false
    } else if (!isValidEmail(email.value)) {
      showFieldError(email, "Email inválido")
      isValid = false
    }

    // Validação da mensagem
    if (!mensagem.value.trim()) {
      showFieldError(mensagem, "Mensagem é obrigatória")
      isValid = false
    } else if (mensagem.value.trim().length < 10) {
      showFieldError(mensagem, "Mensagem deve ter pelo menos 10 caracteres")
      isValid = false
    }

    return isValid
  }

  /**
   * Valida um campo específico
   */
  function validateField(field) {
    const value = field.value.trim()

    if (field.hasAttribute("required") && !value) {
      showFieldError(field, `${field.previousElementSibling.textContent.replace("*", "").trim()} é obrigatório`)
      return false
    }

    if (field.type === "email" && value && !isValidEmail(value)) {
      showFieldError(field, "Email inválido")
      return false
    }

    clearFieldError(field)
    return true
  }

  /**
   * Mostra erro em um campo específico
   */
  function showFieldError(field, message) {
    clearFieldError(field)

    field.style.borderColor = "#ef4444"

    const errorElement = document.createElement("span")
    errorElement.className = "field-error"
    errorElement.style.color = "#ef4444"
    errorElement.style.fontSize = "0.875rem"
    errorElement.style.marginTop = "0.25rem"
    errorElement.style.display = "block"
    errorElement.textContent = message

    field.parentNode.appendChild(errorElement)
  }

  /**
   * Remove erro de um campo específico
   */
  function clearFieldError(field) {
    field.style.borderColor = "#e2e8f0"

    const existingError = field.parentNode.querySelector(".field-error")
    if (existingError) {
      existingError.remove()
    }
  }

  /**
   * Valida formato de email
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * envio do formulário
   */
  function simulateFormSubmission() {
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    // Mostra estado de carregamento
    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Simula delay de envio
    setTimeout(() => {
      // Mostra mensagem de sucesso
      showFormMessage("Mensagem enviada com sucesso! Entrarei em contato em breve.", "success")

      contactForm.reset()

      submitButton.textContent = originalText
      submitButton.disabled = false

      // Remove a mensagem após 5 segundos
      setTimeout(() => {
        hideFormMessage()
      }, 5000)
    }, 2000)
  }

  /**
   * Mostra mensagem do formulário
   */
  function showFormMessage(message, type) {
    formMessage.textContent = message
    formMessage.className = `form-message ${type}`
    formMessage.style.display = "block"

    // Scroll suave para a mensagem
    formMessage.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  /**
   * Esconde mensagem do formulário
   */
  function hideFormMessage() {
    formMessage.style.display = "none"
    formMessage.className = "form-message"
  }
}

/**
 * Inicializa animações baseadas no scroll
 */
function initScrollAnimations() {
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Elementos para animar
    const animatedElements = document.querySelectorAll(
      ".hobby-card, .timeline-item, .course-card, .language-card, .skill-category, .project-card, .cert-card, .contact-card",
    )

    animatedElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
      observer.observe(element)
    })
  }
}

/**
 * Inicializa a navegação ativa baseada na página atual
 */
function initActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")

    link.classList.remove("active")

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (currentPage === "index.html" && linkPage === "index.html")
    ) {
      link.classList.add("active")
    }
  })
}

function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const targetPosition = targetElement.offsetTop - headerHeight - 20

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

/**
 * Função para detectar dispositivos móveis
 */
function isMobileDevice() {
  return window.innerWidth <= 768
}

// ===REDIMENSIONAMENTO ===
window.addEventListener(
  "resize",
  debounce(() => {
    if (!isMobileDevice()) {
      const hamburger = document.querySelector(".hamburger")
      const navMenu = document.querySelector(".nav-menu")

      if (hamburger && navMenu) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    }
  }, 250),
)

// === SCROLL PARA TOPO ===
function addScrollToTop() {
  const scrollButton = document.createElement("button")
  scrollButton.innerHTML = "↑"
  scrollButton.className = "scroll-to-top"
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `

  document.body.appendChild(scrollButton)

  // Mostra/esconde botão baseado no scroll
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = "1"
        scrollButton.style.visibility = "visible"
      } else {
        scrollButton.style.opacity = "0"
        scrollButton.style.visibility = "hidden"
      }
    }, 100),
  )

  // Funcionalidade de scroll para o topo
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

if (document.body.scrollHeight > window.innerHeight * 2) {
  addScrollToTop()
}

