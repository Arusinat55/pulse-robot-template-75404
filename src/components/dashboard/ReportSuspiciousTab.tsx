import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Upload, 
  Shield, 
  Globe, 
  Mail, 
  Phone,
  Send,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";

const ReportSuspiciousTab = () => {
  const [reportData, setReportData] = useState({
    type: "",
    urgency: "",
    source: "",
    description: "",
    evidence: "",
    contactInfo: "",
    files: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Submit suspicious activity report - This will connect to Supabase when integrated
    console.log("Submitting suspicious activity report:", reportData);
    
    // Reset form after submission
    setTimeout(() => {
      setReportData({
        type: "",
        urgency: "",
        source: "",
        description: "",
        evidence: "",
        contactInfo: "",
        files: []
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReportData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setReportData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Mock existing reports
  const suspiciousReports = [
    {
      id: "SA-001",
      type: "Phishing Email",
      urgency: "High",
      status: "Investigating",
      date: "2024-01-23",
      source: "Email",
      progress: 75
    },
    {
      id: "SA-002",
      type: "Malware Detection",
      urgency: "Critical",
      status: "Resolved",
      date: "2024-01-21",
      source: "Network Scan",
      progress: 100
    },
    {
      id: "SA-003",
      type: "Suspicious Login",
      urgency: "Medium",
      status: "Under Review",
      date: "2024-01-24",
      source: "System Alert",
      progress: 40
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "text-red-600 border-red-600";
      case "High": return "text-orange-600 border-orange-600";
      case "Medium": return "text-yellow-600 border-yellow-600";
      case "Low": return "text-green-600 border-green-600";
      default: return "text-gray-600 border-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "text-green-600 border-green-600";
      case "Investigating": return "text-blue-600 border-blue-600";
      case "Under Review": return "text-orange-600 border-orange-600";
      default: return "text-gray-600 border-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> If you've discovered an immediate security threat, 
          please contact our emergency response team immediately at emergency@cybersecure.com 
          or call +1 (555) 999-CYBER.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Suspicious Activity Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Report Suspicious Activity
            </CardTitle>
            <CardDescription>
              Report potential security threats, malware, phishing attempts, or other suspicious activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Threat Type</Label>
                <Select
                  value={reportData.type}
                  onValueChange={(value) => setReportData({...reportData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select threat type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phishing">Phishing Email</SelectItem>
                    <SelectItem value="malware">Malware/Virus</SelectItem>
                    <SelectItem value="social-engineering">Social Engineering</SelectItem>
                    <SelectItem value="unauthorized-access">Unauthorized Access</SelectItem>
                    <SelectItem value="data-breach">Data Breach</SelectItem>
                    <SelectItem value="ddos">DDoS Attack</SelectItem>
                    <SelectItem value="suspicious-website">Suspicious Website</SelectItem>
                    <SelectItem value="ransomware">Ransomware</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select
                    value={reportData.urgency}
                    onValueChange={(value) => setReportData({...reportData, urgency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={reportData.source}
                    onValueChange={(value) => setReportData({...reportData, source: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How did you discover this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="system-alert">System Alert</SelectItem>
                      <SelectItem value="colleague">Colleague Report</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the suspicious activity in detail. Include what happened, when it occurred, and any relevant context..."
                  value={reportData.description}
                  onChange={(e) => setReportData({...reportData, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Evidence/Technical Details</Label>
                <Textarea
                  id="evidence"
                  placeholder="Include URLs, IP addresses, email headers, file names, error messages, or any other technical evidence..."
                  value={reportData.evidence}
                  onChange={(e) => setReportData({...reportData, evidence: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information (Optional)</Label>
                <Input
                  id="contactInfo"
                  placeholder="Alternative contact method if we need more information"
                  value={reportData.contactInfo}
                  onChange={(e) => setReportData({...reportData, contactInfo: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Evidence Files</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <input
                    type="file"
                    id="files"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png,.eml,.msg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="files"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Upload screenshots, emails, or other evidence
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC, TXT, JPG, PNG, EML, MSG (Max 25MB each)
                    </span>
                  </label>
                </div>

                {reportData.files.length > 0 && (
                  <div className="space-y-2">
                    {reportData.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suspicious Activity Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Tips
            </CardTitle>
            <CardDescription>
              How to identify and handle suspicious activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Phishing Emails</h4>
                  <p className="text-sm text-muted-foreground">
                    Look for spelling errors, urgent language, suspicious links, or requests for personal information
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Suspicious Websites</h4>
                  <p className="text-sm text-muted-foreground">
                    Check for HTTPS, verify domain names, and be cautious of pop-ups or download prompts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Social Engineering</h4>
                  <p className="text-sm text-muted-foreground">
                    Be wary of unsolicited calls requesting passwords, access codes, or personal information
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Immediate Actions</h4>
                  <p className="text-sm text-muted-foreground">
                    Don't click suspicious links, don't provide credentials, disconnect if compromised
                  </p>
                </div>
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> When in doubt, report it! It's better to report 
                a false alarm than to miss a real security threat.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Recent Suspicious Activity Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Reports</CardTitle>
          <CardDescription>
            Track the status of your submitted suspicious activity reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suspiciousReports.map((report) => (
              <div
                key={report.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{report.type}</h4>
                    <Badge variant="outline" className={getUrgencyColor(report.urgency)}>
                      {report.urgency}
                    </Badge>
                  </div>
                  <Badge variant="outline" className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Report ID:</span>
                    <p className="font-mono text-sm">{report.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Source:</span>
                    <p className="text-sm">{report.source}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <p className="text-sm">{new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ReportSuspiciousTab };