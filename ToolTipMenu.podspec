require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "ToolTipMenu"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['repository']['url']
  s.platform     = :ios, "7.0"
  s.ios.deployment_target = '7.0'

  s.source       = { :git => "https://github.com/marcosrdz/react-native-tooltip.git", :tag => "#{s.version}" }
  s.preserve_paths = '*'
  s.source_files  = "ToolTipMenu/*.{h,m}"

  s.dependency 'React'
end
