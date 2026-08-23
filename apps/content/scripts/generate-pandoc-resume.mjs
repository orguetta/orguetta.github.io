import fs from "fs";
import matter from "gray-matter";

const resumePath = "src/pages/resume.md";
const outputPath = "temp-resume.md";

if (!fs.existsSync(resumePath)) {
  console.error(`Error: ${resumePath} not found.`);
  process.exit(1);
}

const fileContent = fs.readFileSync(resumePath, "utf8");
const { data, content } = matter(fileContent);

// Start with Name as H1 (centered by CSS)
let pandocContent = `---\ntitle: ${data.title}\n---\n\n`;

// Centered Contact Block
if (data.contact) {
  const contactParts = [];
  if (data.contact.email)
    contactParts.push(`[${data.contact.email}](mailto:${data.contact.email})`);
  if (data.contact.phone) contactParts.push(`${data.contact.phone}`);
  if (data.contact.linkedin)
    contactParts.push(
      `[LinkedIn](https://linkedin.com/in/${data.contact.linkedin})`
    );
  if (data.contact.github)
    contactParts.push(`[GitHub](https://github.com/${data.contact.github})`);

  pandocContent += `<div style="text-align: center; margin-top: -10px; margin-bottom: 20px; font-size: 0.9em;">\n`;
  pandocContent += contactParts.join("  •  ");
  pandocContent += `\n</div>\n\n`;
}

// Add the body content (Summary, Experience, Projects)
pandocContent += content;

// Append Skills (Categorized)
if (data.skills) {
  pandocContent += `\n\n## Technical Skills\n\n`;
  data.skills.forEach(group => {
    pandocContent += `**${group.category}**: ${group.items.join(", ")}  \n`;
  });
}

// Append Education
if (data.education) {
  pandocContent += `\n\n## Education & Certifications\n\n`;
  data.education.forEach(edu => {
    pandocContent += `**${edu.title}** ${edu.org ? `(${edu.org})` : ""}  \n`;
    pandocContent += `${edu.date}  \n\n`;
  });
}

// Append Languages (Compact)
if (data.languages) {
  const langParts = data.languages.map(
    lang => `**${lang.name}** (${lang.level})`
  );
  pandocContent += `\n\n## Languages\n\n`;
  pandocContent += langParts.join("  •  ");
  pandocContent += `\n`;
}

fs.writeFileSync(outputPath, pandocContent);
console.log(
  `Generated ${outputPath} for Pandoc with optimized professional layout.`
);
