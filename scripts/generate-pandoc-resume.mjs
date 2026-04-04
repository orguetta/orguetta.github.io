import fs from 'fs';
import matter from 'gray-matter';

const resumePath = 'src/pages/resume.md';
const outputPath = 'temp-resume.md';

if (!fs.existsSync(resumePath)) {
  console.error(`Error: ${resumePath} not found.`);
  process.exit(1);
}

const fileContent = fs.readFileSync(resumePath, 'utf8');
const { data, content } = matter(fileContent);

let pandocContent = `---\ntitle: ${data.title}\n---\n\n`;

// Add Contact info at the top if it exists
if (data.contact) {
  pandocContent += `###### [${data.contact.email}](mailto:${data.contact.email}) . [github.com/${data.contact.github}](https://github.com/${data.contact.github}) . [linkedin.com/in/${data.contact.linkedin}](https://linkedin.com/in/${data.contact.linkedin})\n\n`;
}

// Add the body content
pandocContent += content;

// Append Skills
if (data.skills) {
  pandocContent += `\n\n## Skills\n\n`;
  data.skills.forEach(group => {
    pandocContent += `**${group.category}**: ${group.items.join(', ')}  \n`;
  });
}

// Append Education
if (data.education) {
  pandocContent += `\n\n## Education\n\n`;
  data.education.forEach(edu => {
    pandocContent += `### ${edu.title}\n`;
    pandocContent += `${edu.date} ${edu.org ? `· ${edu.org}` : ''}  \n\n`;
  });
}

// Append Languages
if (data.languages) {
  pandocContent += `\n\n## Languages\n\n`;
  data.languages.forEach(lang => {
    pandocContent += `**${lang.name}**: ${lang.level}  \n`;
  });
}

fs.writeFileSync(outputPath, pandocContent);
console.log(`Generated ${outputPath} for Pandoc.`);
