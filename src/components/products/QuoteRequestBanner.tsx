import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const QuoteRequestBanner = () => {
  return (
    <Card className="bg-gradient-primary text-white border-0 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Need a Custom Quote?</h3>
              <p className="text-white/80">Get personalized pricing for bulk orders or custom configurations</p>
            </div>
          </div>

          <Link to="/quote-request">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
              Request Quote
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuoteRequestBanner
