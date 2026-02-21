(function () {
    // DOM Elements
    const fullNameInp = document.getElementById('fullName');
    const jobTitleInp = document.getElementById('jobTitle');
    const emailInp = document.getElementById('email');
    const phoneInp = document.getElementById('phone');
    const locationInp = document.getElementById('location');
    const websiteInp = document.getElementById('website');
    const summaryInp = document.getElementById('summary');
    const educationInp = document.getElementById('education');
    const projectsInp = document.getElementById('projects');
    const achievementsInp = document.getElementById('achievements');
    const profilePhotoInp = document.getElementById('profilePhoto');

    const previewName = document.querySelector('.preview-name');
    const previewTitle = document.querySelector('.preview-title');
    const previewContact = document.querySelector('.preview-contact');
    const previewSummary = document.querySelector('.preview-summary');
    const previewEducation = document.querySelector('.preview-education');
    const previewProjects = document.querySelector('.preview-projects');
    const previewAchievements = document.querySelector('.preview-achievements');
    const skillsDisplay = document.querySelector('.skills-display');
    const resumePreview = document.getElementById('resumePreview');
    const profilePhotoPreview = document.getElementById('profilePhotoPreview');

    // Skills management
    const skillsContainer = document.getElementById('skillsContainer');
    const newSkillInput = document.getElementById('newSkill');
    const addSkillBtn = document.getElementById('addSkillBtn');
    let skills = [];

    // Template management
    const templateModern = document.getElementById('templateModern');
    const templateClassic = document.getElementById('templateClassic');
    const templateMinimal = document.getElementById('templateMinimal');
    let currentTemplate = 'modern';

    // Update skills display
    function updateSkillsDisplay() {
        // Update skills tags in form
        skillsContainer.innerHTML = skills.map(skill =>
            `<span class="skill-tag">${skill} <i class="fas fa-times"></i></span>`
        ).join('');

        // Update preview skills
        skillsDisplay.innerHTML = skills.map(skill =>
            `<span class="skill-badge">${skill}</span>`
        ).join('');

        // Add delete event listeners to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('click', function (e) {
                if (e.target.classList.contains('fa-times')) {
                    const skillText = this.textContent.replace('×', '').trim();
                    skills = skills.filter(s => s !== skillText);
                    updateSkillsDisplay();
                    showToast('Skill removed');
                }
            });
        });
    }

    // Profile photo upload
    profilePhotoInp.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                profilePhotoPreview.src = event.target.result;
                profilePhotoPreview.classList.add('show');
                showToast('Photo uploaded!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Add new skill
    addSkillBtn.addEventListener('click', function () {
        const newSkill = newSkillInput.value.trim();
        if (newSkill && !skills.includes(newSkill)) {
            skills.push(newSkill);
            updateSkillsDisplay();
            newSkillInput.value = '';
            showToast('Skill added!');
        } else if (skills.includes(newSkill)) {
            showToast('Skill already exists', 'error');
        }
    });

    // Update preview function
    function updatePreview() {
        // Update text content
        previewName.textContent = fullNameInp.value || 'Your Name';
        previewTitle.textContent = jobTitleInp.value || 'Job Title';

        // Update contact section
        const contactSpans = previewContact.querySelectorAll('span');
        if (contactSpans.length >= 4) {
            contactSpans[0].innerHTML = `<i class="fas fa-envelope"></i> ${emailInp.value || 'email@example.com'}`;
            contactSpans[1].innerHTML = `<i class="fas fa-phone"></i> ${phoneInp.value || '+1 234 567 890'}`;
            contactSpans[2].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${locationInp.value || 'Location'}`;
            contactSpans[3].innerHTML = `<i class="fas fa-globe"></i> ${websiteInp.value || 'website.com'}`;
        }

        previewSummary.textContent = summaryInp.value || 'Your career objective';
        previewEducation.textContent = educationInp.value || 'Your education';
        if (previewProjects) previewProjects.textContent = projectsInp.value || 'Your projects';
        if (previewAchievements) previewAchievements.textContent = achievementsInp.value || 'Your achievements';

        updateSkillsDisplay();
        applyTemplate(currentTemplate);
        showToast('Preview updated!');
    }

    // Template switching
    function applyTemplate(template) {
        // Remove all template classes
        resumePreview.classList.remove('template-modern', 'template-classic', 'template-minimal');

        // Add selected template class
        resumePreview.classList.add(`template-${template}`);

        // Update active state in template selector
        document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
        if (template === 'modern') templateModern.classList.add('active');
        if (template === 'classic') templateClassic.classList.add('active');
        if (template === 'minimal') templateMinimal.classList.add('active');

        // Toggle photo input visibility
        const photoInputGroup = document.getElementById('photoInputGroup');
        if (template === 'classic' || template === 'minimal') {
            photoInputGroup.classList.add('hidden');
        } else {
            photoInputGroup.classList.remove('hidden');
        }

        currentTemplate = template;
    }

    templateModern.addEventListener('click', () => applyTemplate('modern'));
    templateClassic.addEventListener('click', () => applyTemplate('classic'));
    templateMinimal.addEventListener('click', () => applyTemplate('minimal'));

    // Reset form
    function resetForm() {
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        const randomEmail = `user${randomNum}@example.com`;
        const randomPhone = `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`;

        fullNameInp.value = '';
        jobTitleInp.value = '';
        emailInp.value = randomEmail;
        phoneInp.value = randomPhone;
        locationInp.value = '';
        websiteInp.value = '';
        summaryInp.value = '';
        educationInp.value = '';
        projectsInp.value = '';
        achievementsInp.value = '';
        profilePhotoInp.value = '';
        profilePhotoPreview.src = '';
        profilePhotoPreview.classList.remove('show');
        skills = [];
        updatePreview();
        showToast('Form reset successfully!');
    }

    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.background = type === 'success' ? '#10b981' : '#ef4444';
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Download functions
    async function downloadAsPDF() {
        try {
            const element = document.getElementById('resumePreview');
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width * 0.75, canvas.height * 0.75]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75);
            pdf.save('resume.pdf');
            showToast('PDF downloaded successfully!');
        } catch (error) {
            showToast('Error generating PDF', 'error');
        }
    }

    async function downloadAsJPG() {
        try {
            const element = document.getElementById('resumePreview');
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff'
            });

            const link = document.createElement('a');
            link.download = 'resume.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.click();
            showToast('JPG downloaded successfully!');
        } catch (error) {
            showToast('Error generating JPG', 'error');
        }
    }

    async function downloadAsDOC() {
        try {
            showToast('Generating DOC file...');

            // Check if docx library is loaded
            if (!window.docx) {
                throw new Error('DOCX library not loaded. Please refresh the page.');
            }

            const { Document, Packer, Paragraph, HeadingLevel, AlignmentType, TextRun } = window.docx;

            const children = [
                new Paragraph({
                    children: [new TextRun({ text: fullNameInp.value || 'Your Name', bold: true, size: 32 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: jobTitleInp.value || 'Job Title', size: 24 })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: `${emailInp.value || 'email@example.com'} | ${phoneInp.value || 'phone'} | ${locationInp.value || 'location'}` })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Career Objective", bold: true, size: 24 })],
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: summaryInp.value || 'Your career objective' })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Education", bold: true, size: 24 })],
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: educationInp.value || 'Your education' })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Technical Skills", bold: true, size: 24 })],
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: skills.length > 0 ? skills.join(' · ') : 'Your skills' })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Projects", bold: true, size: 24 })],
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: projectsInp.value || 'Your projects' })],
                    spacing: { after: 200 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "Achievements", bold: true, size: 24 })],
                    spacing: { before: 200, after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: achievementsInp.value || 'Your achievements' })]
                })
            ];

            const doc = new Document({
                sections: [{
                    children: children
                }]
            });

            const blob = await Packer.toBlob(doc);

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `resume_${Date.now()}.docx`;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, 100);
            showToast('DOC downloaded successfully!');
        } catch (error) {
            console.error('DOC Error:', error);
            showToast('Error: ' + error.message, 'error');
        }
    }

    function downloadAsHTML() {
        const resumeHTML = document.getElementById('resumePreview').outerHTML;
        const styles = document.querySelector('style').innerHTML;

        const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <title>My Resume</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>${styles}</style>
</head>
<body style="padding: 20px; background: #f8fafc;">
    ${resumeHTML}
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
        URL.revokeObjectURL(link.href);
        showToast('HTML downloaded successfully!');
    }

    // Event listeners
    document.getElementById('updatePreviewBtn').addEventListener('click', updatePreview);
    document.getElementById('resetFormBtn').addEventListener('click', resetForm);
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadAsPDF);
    document.getElementById('downloadJpgBtn').addEventListener('click', downloadAsJPG);
    document.getElementById('downloadDocBtn').addEventListener('click', downloadAsDOC);
    document.getElementById('downloadHtmlBtn').addEventListener('click', downloadAsHTML);

    // Live preview on input
    const inputs = [fullNameInp, jobTitleInp, emailInp, phoneInp, locationInp, websiteInp, summaryInp, educationInp, projectsInp, achievementsInp];
    inputs.forEach(inp => inp.addEventListener('input', updatePreview));

    // Initialize
    updateSkillsDisplay();
    applyTemplate('modern');
    showToast('Welcome to ResumePro Builder!');
})();
