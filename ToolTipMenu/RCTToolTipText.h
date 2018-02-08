#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@class RCTEventDispatcher;

@interface RCTToolTipText : RCTView

- (void)tappedMenuItem:(NSString *)text;

- (void)didHideMenu:(NSNotification *)notification;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
