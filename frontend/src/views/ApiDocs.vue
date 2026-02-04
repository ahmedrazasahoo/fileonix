<template>
  <div class="api-docs-page">
    <div class="api-container">
      <!-- Header Section -->
      <header class="api-header">
        <h1 class="api-title">
          <span class="icon"><BookOpen :size="56" :stroke-width="1.5" /></span>
          FileOnix API Documentation
        </h1>
        <p class="api-subtitle">Complete API reference for image conversion services</p>
      </header>

      <!-- Quick Links -->
      <div class="quick-links">
        <a href="#endpoints" class="link-card">
          <div class="link-icon"><Link :size="40" :stroke-width="1.5" /></div>
          <h3>Endpoints</h3>
          <p>API endpoints reference</p>
        </a>
        <a href="#authentication" class="link-card">
          <div class="link-icon"><Lock :size="40" :stroke-width="1.5" /></div>
          <h3>Authentication</h3>
          <p>How to authenticate</p>
        </a>
        <a href="#examples" class="link-card">
          <div class="link-icon"><Code :size="40" :stroke-width="1.5" /></div>
          <h3>Code Examples</h3>
          <p>Integration examples</p>
        </a>
        <a href="#errors" class="link-card">
          <div class="link-icon"><AlertTriangle :size="40" :stroke-width="1.5" /></div>
          <h3>Error Codes</h3>
          <p>Error handling guide</p>
        </a>
      </div>

      <!-- Base URL Section -->
      <section class="api-section">
        <h2 id="base-url" class="section-title">Base URL</h2>
        <div class="code-block">
          <code>https://api.fileonix.com/v1</code>
        </div>
      </section>

      <!-- Authentication Section -->
      <section class="api-section">
        <h2 id="authentication" class="section-title"><Lock :size="28" :stroke-width="2" class="section-icon" /> Authentication</h2>
        <p class="section-description">All API requests require an API key to be included in the header.</p>
        
        <div class="code-block">
          <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
        </div>

        <div class="info-box">
          <strong>Getting Your API Key:</strong> Sign up at <a href="/dashboard">dashboard</a> to get your free API key.
        </div>
      </section>

      <!-- Endpoints Section -->
      <section class="api-section">
        <h2 id="endpoints" class="section-title"><Link :size="28" :stroke-width="2" class="section-icon" /> API Endpoints</h2>

        <!-- Convert Image Endpoint -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="http-method post">POST</span>
            <span class="endpoint-path">/convert</span>
          </div>
          
          <h3 class="endpoint-title">Convert Image</h3>
          <p class="endpoint-description">Convert an image to a different format with optional quality and resize settings.</p>

          <h4 class="subsection-title">Request Parameters</h4>
          <div class="params-table">
            <div class="param-row header">
              <span class="param-name">Parameter</span>
              <span class="param-type">Type</span>
              <span class="param-required">Required</span>
              <span class="param-desc">Description</span>
            </div>
            <div class="param-row">
              <span class="param-name">image</span>
              <span class="param-type">File</span>
              <span class="param-required required">Yes</span>
              <span class="param-desc">Image file to convert (PNG, JPG, WebP, GIF, BMP)</span>
            </div>
            <div class="param-row">
              <span class="param-name">format</span>
              <span class="param-type">String</span>
              <span class="param-required required">Yes</span>
              <span class="param-desc">Output format: png, jpeg, webp, gif</span>
            </div>
            <div class="param-row">
              <span class="param-name">quality</span>
              <span class="param-type">Integer</span>
              <span class="param-required optional">No</span>
              <span class="param-desc">Quality 1-100 (default: 90)</span>
            </div>
            <div class="param-row">
              <span class="param-name">width</span>
              <span class="param-type">Integer</span>
              <span class="param-required optional">No</span>
              <span class="param-desc">Resize width in pixels</span>
            </div>
            <div class="param-row">
              <span class="param-name">height</span>
              <span class="param-type">Integer</span>
              <span class="param-required optional">No</span>
              <span class="param-desc">Resize height in pixels</span>
            </div>
            <div class="param-row">
              <span class="param-name">maintain_ratio</span>
              <span class="param-type">Boolean</span>
              <span class="param-required optional">No</span>
              <span class="param-desc">Keep aspect ratio (default: true)</span>
            </div>
          </div>

          <h4 class="subsection-title">Example Request</h4>
          <div class="code-block">
            <pre><code>curl -X POST https://api.fileonix.com/v1/convert \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@photo.jpg" \
  -F "format=webp" \
  -F "quality=85" \
  -F "width=1920"</code></pre>
          </div>

          <h4 class="subsection-title">Example Response</h4>
          <div class="code-block">
            <pre><code>{
  "success": true,
  "data": {
    "download_url": "https://cdn.fileonix.com/converted/abc123.webp",
    "format": "webp",
    "size": 245760,
    "original_size": 1048576,
    "savings_percent": 76.57,
    "dimensions": {
      "width": 1920,
      "height": 1080
    },
    "expires_at": "2024-02-05T12:00:00Z"
  }
}</code></pre>
          </div>
        </div>

        <!-- Batch Convert Endpoint -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="http-method post">POST</span>
            <span class="endpoint-path">/convert/batch</span>
          </div>
          
          <h3 class="endpoint-title">Batch Convert Images</h3>
          <p class="endpoint-description">Convert multiple images in a single request.</p>

          <h4 class="subsection-title">Example Request</h4>
          <div class="code-block">
            <pre><code>curl -X POST https://api.fileonix.com/v1/convert/batch \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "images[]=@photo1.jpg" \
  -F "images[]=@photo2.jpg" \
  -F "images[]=@photo3.jpg" \
  -F "format=webp" \
  -F "quality=80"</code></pre>
          </div>

          <h4 class="subsection-title">Example Response</h4>
          <div class="code-block">
            <pre><code>{
  "success": true,
  "data": {
    "total": 3,
    "completed": 3,
    "failed": 0,
    "results": [
      {
        "filename": "photo1.jpg",
        "download_url": "https://cdn.fileonix.com/converted/abc123.webp",
        "size": 245760
      },
      {
        "filename": "photo2.jpg",
        "download_url": "https://cdn.fileonix.com/converted/def456.webp",
        "size": 312456
      },
      {
        "filename": "photo3.jpg",
        "download_url": "https://cdn.fileonix.com/converted/ghi789.webp",
        "size": 198234
      }
    ]
  }
}</code></pre>
          </div>
        </div>

        <!-- Get Conversion Status -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="http-method get">GET</span>
            <span class="endpoint-path">/convert/:id</span>
          </div>
          
          <h3 class="endpoint-title">Get Conversion Status</h3>
          <p class="endpoint-description">Check the status of a conversion job.</p>

          <h4 class="subsection-title">Example Request</h4>
          <div class="code-block">
            <pre><code>curl -X GET https://api.fileonix.com/v1/convert/abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>
          </div>

          <h4 class="subsection-title">Example Response</h4>
          <div class="code-block">
            <pre><code>{
  "success": true,
  "data": {
    "id": "abc123",
    "status": "completed",
    "progress": 100,
    "download_url": "https://cdn.fileonix.com/converted/abc123.webp",
    "created_at": "2024-02-04T10:30:00Z",
    "completed_at": "2024-02-04T10:30:15Z"
  }
}</code></pre>
          </div>
        </div>

        <!-- Supported Formats -->
        <div class="endpoint-card">
          <div class="endpoint-header">
            <span class="http-method get">GET</span>
            <span class="endpoint-path">/formats</span>
          </div>
          
          <h3 class="endpoint-title">Get Supported Formats</h3>
          <p class="endpoint-description">Retrieve list of all supported image formats.</p>

          <h4 class="subsection-title">Example Response</h4>
          <div class="code-block">
            <pre><code>{
  "success": true,
  "data": {
    "input_formats": ["png", "jpeg", "jpg", "webp", "gif", "bmp", "tiff"],
    "output_formats": ["png", "jpeg", "webp", "gif"],
    "max_file_size": 52428800,
    "max_dimension": 8192
  }
}</code></pre>
          </div>
        </div>
      </section>

      <!-- Error Codes Section -->
      <section class="api-section">
        <h2 id="errors" class="section-title"><AlertTriangle :size="28" :stroke-width="2" class="section-icon" /> Error Codes</h2>
        
        <div class="error-table">
          <div class="error-row header">
            <span class="error-code">Code</span>
            <span class="error-message">Error</span>
            <span class="error-desc">Description</span>
          </div>
          <div class="error-row">
            <span class="error-code">400</span>
            <span class="error-message">Bad Request</span>
            <span class="error-desc">Invalid parameters or missing required fields</span>
          </div>
          <div class="error-row">
            <span class="error-code">401</span>
            <span class="error-message">Unauthorized</span>
            <span class="error-desc">Invalid or missing API key</span>
          </div>
          <div class="error-row">
            <span class="error-code">403</span>
            <span class="error-message">Forbidden</span>
            <span class="error-desc">API key doesn't have access to this resource</span>
          </div>
          <div class="error-row">
            <span class="error-code">413</span>
            <span class="error-message">Payload Too Large</span>
            <span class="error-desc">File size exceeds 50MB limit</span>
          </div>
          <div class="error-row">
            <span class="error-code">415</span>
            <span class="error-message">Unsupported Media Type</span>
            <span class="error-desc">File format not supported</span>
          </div>
          <div class="error-row">
            <span class="error-code">429</span>
            <span class="error-message">Too Many Requests</span>
            <span class="error-desc">Rate limit exceeded</span>
          </div>
          <div class="error-row">
            <span class="error-code">500</span>
            <span class="error-message">Internal Server Error</span>
            <span class="error-desc">Server error during conversion</span>
          </div>
        </div>

        <h4 class="subsection-title">Error Response Format</h4>
        <div class="code-block">
          <pre><code>{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid format specified",
    "details": "Supported formats are: png, jpeg, webp, gif"
  }
}</code></pre>
        </div>
      </section>

      <!-- Code Examples Section -->
      <section class="api-section">
        <h2 id="examples" class="section-title"><Code :size="28" :stroke-width="2" class="section-icon" /> Code Examples</h2>

        <!-- JavaScript Example -->
        <div class="example-card">
          <h3 class="example-title">JavaScript (Fetch API)</h3>
          <div class="code-block">
            <pre><code>const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('format', 'webp');
formData.append('quality', '85');

const response = await fetch('https://api.fileonix.com/v1/convert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
if (result.success) {
  console.log('Download URL:', result.data.download_url);
}</code></pre>
          </div>
        </div>

        <!-- Python Example -->
        <div class="example-card">
          <h3 class="example-title">Python (Requests)</h3>
          <div class="code-block">
            <pre><code>import requests

url = "https://api.fileonix.com/v1/convert"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
files = {
    "image": open("photo.jpg", "rb")
}
data = {
    "format": "webp",
    "quality": "85"
}

response = requests.post(url, headers=headers, files=files, data=data)
result = response.json()

if result["success"]:
    print(f"Download URL: {result['data']['download_url']}")</code></pre>
          </div>
        </div>

        <!-- PHP Example -->
        <div class="example-card">
          <h3 class="example-title">PHP (cURL)</h3>
          <div class="code-block">
            <pre><code>&lt;?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.fileonix.com/v1/convert",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY"
    ],
    CURLOPT_POSTFIELDS => [
        'image' => new CURLFile('photo.jpg'),
        'format' => 'webp',
        'quality' => '85'
    ]
]);

$response = curl_exec($curl);
$result = json_decode($response, true);

if ($result['success']) {
    echo "Download URL: " . $result['data']['download_url'];
}

curl_close($curl);
?&gt;</code></pre>
          </div>
        </div>

        <!-- Node.js Example -->
        <div class="example-card">
          <h3 class="example-title">Node.js (Axios)</h3>
          <div class="code-block">
            <pre><code>const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('image', fs.createReadStream('photo.jpg'));
form.append('format', 'webp');
form.append('quality', '85');

const response = await axios.post(
  'https://api.fileonix.com/v1/convert',
  form,
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      ...form.getHeaders()
    }
  }
);

if (response.data.success) {
  console.log('Download URL:', response.data.data.download_url);
}</code></pre>
          </div>
        </div>
      </section>

      <!-- Rate Limits Section -->
      <section class="api-section">
        <h2 class="section-title">⏱️ Rate Limits</h2>
        
        <div class="rate-limits-grid">
          <div class="rate-limit-card">
            <h3 class="plan-name">Free Plan</h3>
            <div class="plan-limits">
              <div class="limit-item">
                <span class="limit-label">Requests per hour:</span>
                <span class="limit-value">100</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Max file size:</span>
                <span class="limit-value">10 MB</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Batch size:</span>
                <span class="limit-value">5 files</span>
              </div>
            </div>
          </div>

          <div class="rate-limit-card">
            <h3 class="plan-name">Pro Plan</h3>
            <div class="plan-limits">
              <div class="limit-item">
                <span class="limit-label">Requests per hour:</span>
                <span class="limit-value">1,000</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Max file size:</span>
                <span class="limit-value">50 MB</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Batch size:</span>
                <span class="limit-value">50 files</span>
              </div>
            </div>
          </div>

          <div class="rate-limit-card">
            <h3 class="plan-name">Enterprise Plan</h3>
            <div class="plan-limits">
              <div class="limit-item">
                <span class="limit-label">Requests per hour:</span>
                <span class="limit-value">Unlimited</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Max file size:</span>
                <span class="limit-value">100 MB</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">Batch size:</span>
                <span class="limit-value">Unlimited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Support Section -->
      <section class="api-section">
        <h2 class="section-title"><MessageCircle :size="28" :stroke-width="2" class="section-icon" /> Support</h2>
        <div class="support-grid">
          <a href="/contact" class="support-card">
            <div class="support-icon"><Mail :size="40" :stroke-width="1.5" /></div>
            <h3>Email Support</h3>
            <p>Get help via email</p>
          </a>
          <a href="/blog" class="support-card">
            <div class="support-icon"><FileText :size="40" :stroke-width="1.5" /></div>
            <h3>Documentation</h3>
            <p>Read our guides</p>
          </a>
          <a href="https://github.com" class="support-card">
            <div class="support-icon"><MessageCircle :size="40" :stroke-width="1.5" /></div>
            <h3>Community</h3>
            <p>Join discussions</p>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { BookOpen, Link, Lock, Code, AlertTriangle, Mail, FileText, MessageCircle } from 'lucide-vue-next'

export default {
  name: 'ApiDocs',
  components: {
    BookOpen,
    Link,
    Lock,
    Code,
    AlertTriangle,
    Mail,
    FileText,
    MessageCircle
  }
}
</script>

<style scoped>
.api-docs-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 2rem 1rem;
}

.api-container {
  max-width: 1280px;
  margin: 0 auto;
}

/* Header */
.api-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 4rem 0 2rem 0;
}

.api-title {
  font-size: 3.2em;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.icon {
  display: inline-flex;
  color: var(--color-primary);
}

.api-subtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}

/* Quick Links */
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.link-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: var(--color-primary);
  background: var(--bg-tertiary);
}

.link-icon {
  display: inline-flex;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.link-card h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.link-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Sections */
.api-section {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.section-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-primary);
  font-weight: 600;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  flex-shrink: 0;
}

.section-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.subsection-title {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin: 2rem 0 1rem 0;
  font-weight: 600;
}

/* Code Blocks */
.code-block {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  overflow-x: auto;
  border: 1px solid var(--border-color);
}

.code-block code,
.code-block pre {
  color: var(--text-primary);
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Info Box */
.info-box {
  background: rgba(99, 102, 241, 0.1);
  border-left: 4px solid var(--color-primary);
  padding: 1.25rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  color: var(--text-primary);
}

.info-box a {
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: underline;
}

.info-box a:hover {
  color: var(--color-secondary);
}

/* Endpoint Cards */
.endpoint-card {
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  background: var(--bg-tertiary);
  transition: all 0.3s ease;
}

.endpoint-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.http-method {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.http-method.get {
  background: var(--color-success);
  color: white;
}

.http-method.post {
  background: var(--color-info);
  color: white;
}

.http-method.put {
  background: var(--color-warning);
  color: white;
}

.http-method.delete {
  background: var(--color-danger);
  color: white;
}

.endpoint-path {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.endpoint-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.endpoint-description {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

/* Parameters Table */
.params-table {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.param-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 2fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--divider);
}

.param-row:last-child {
  border-bottom: none;
}

.param-row.header {
  background: rgba(99, 102, 241, 0.1);
  font-weight: 700;
  color: var(--text-primary);
}

.param-name {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace;
  color: var(--text-primary);
  font-weight: 600;
}

.param-type {
  color: var(--color-secondary);
  font-style: italic;
  font-weight: 500;
}

.param-required.required {
  color: var(--color-error);
  font-weight: 600;
}

.param-required.optional {
  color: var(--color-success);
  font-weight: 600;
}

.param-desc {
  color: var(--text-secondary);
}

/* Error Table */
.error-table {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin: 1.5rem 0;
}

.error-row {
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 3fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--divider);
}

.error-row:last-child {
  border-bottom: none;
}

.error-row.header {
  background: rgba(99, 102, 241, 0.1);
  font-weight: 700;
  color: var(--text-primary);
}

.error-code {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Courier New', monospace;
  font-weight: 700;
  color: var(--color-error);
}

.error-message {
  font-weight: 600;
  color: var(--text-primary);
}

.error-desc {
  color: var(--text-secondary);
}

/* Example Cards */
.example-card {
  margin-bottom: 2rem;
}

.example-title {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

/* Rate Limits */
.rate-limits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.rate-limit-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.rate-limit-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
}

.plan-name {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-primary);
  font-weight: 600;
}

.plan-limits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.limit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.limit-label {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.limit-value {
  font-weight: 700;
  color: var(--color-secondary);
  font-size: 1.1rem;
}

/* Support Grid */
.support-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.support-card {
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.support-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: var(--color-primary);
  background: var(--bg-card);
}

.support-icon {
  display: inline-flex;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.support-card h3 {
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.support-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .api-title {
    font-size: 2rem;
    flex-direction: column;
  }
  
  .api-subtitle {
    font-size: 1rem;
  }
  
  .api-section {
    padding: 1.5rem;
  }
  
  .param-row,
  .error-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .param-row.header,
  .error-row.header {
    display: none;
  }
  
  .param-row > span,
  .error-row > span {
    display: flex;
    justify-content: space-between;
  }
  
  .param-row > span::before,
  .error-row > span::before {
    content: attr(class);
    font-weight: 700;
    text-transform: capitalize;
  }
  
  .code-block {
    padding: 1rem;
  }
  
  .code-block code,
  .code-block pre {
    font-size: 0.8rem;
  }
}
</style>
